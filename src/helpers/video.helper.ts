require("dotenv").config();
import axios from "axios";

const VideoQueries = require("../models/video.model");

class VideoHelper {
  static apiKey = process.env.GOOGLE_API_KEY;
  static apiUrl = process.env.YOUTUBE_API_URL;

  static removeSpecials(str: any) {
    let lower = str.toLowerCase();
    let upper = str.toUpperCase();

    let res = "" as String,
      i = 0,
      n = lower.length,
      t;
    for (i; i < n; ++i) {
      if (lower[i] !== upper[i] || lower[i].trim() === "") {
        t = str[i];
        if (t !== undefined) {
          res += t;
        }
      }
    }
    return new String(res);
  }

  public static async getVideoListFromYoutubeV3API(searchQuery: string) {
    try {
      const url = `${this.apiUrl}/search?key=${this.apiKey}&type=video&part=snippet&maxResults=1&q=${searchQuery}`;
      let response: any = await axios(url);
      return response?.data?.items;
    } catch (err: any) {
      console.error(
        `Error while fetching yt details: ${JSON.stringify(err?.message)}`
      );
    }
  }

  public static async getSortedResponseforYoutubeV3APIResponse(
    response: any,
    sortByOrder: string
  ) {
    await response?.sort((a: any, b: any) => {
      return sortByOrder === "desc"
        ? Date.parse(b?.snippet?.["publishTime"]) -
            Date.parse(a?.snippet?.["publishTime"])
        : Date.parse(a?.snippet?.["publishTime"]) -
            Date.parse(b?.snippet?.["publishTime"]);
    });
    return response;
  }

  public static async setYoutubeVideoResponseInDatabase(response: any) {
    let listData: any[] = [];

    response?.map(async (data: any) => {
      let object = {
        title: this.removeSpecials(data?.["snippet"]?.["title"]),
        channelId: data?.["snippet"]?.["channelId"],
        channelTitle: data?.["snippet"]?.["channelTitle"],
        videoId: data?.["id"]?.["videoId"],
        description: data?.["snippet"]?.["description"],
        publishedAt: data?.["snippet"]?.["publishedAt"],
        thumbnails: JSON.stringify(data?.["snippet"]?.["thumbnails"]),
        publishTime: data?.["snippet"]?.["publishTime"],
      };
      listData.push(object);
    });

    await VideoHelper.saveDataInDatabase(listData);

    return {
      status: 200,
      message: "success",
    };
  }

  static async saveDataInDatabase(VideoObjectList: any[]) {
    try {
      VideoObjectList.forEach(async (VideoObject: any) => {
        await VideoQueries.VideoModelCreateQuery(VideoObject);
      });

      return null;
    } catch (error: any) {
      return {
        status: 400,
        message: "error while saving schema",
      };
    }
  }

  public static paginateArrayByPageSizeAndNumber = (
    response: any[],
    page_size: number = 10,
    page_number: number
  ) => {
    return response?.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
  };

  public static getAllVideosByAnyKeyInDescOrder = async (
    pageNumber: number,
    sortByOrder: string = "desc",
    sortByKey: string = "publishTime",
    pageSize: number
  ) => {
    try {
      let response = await VideoQueries.VideoModelGetByAnyKeyInDescOrderQuery(
        sortByOrder
      );
      await this.sortVideosByAnyKeyInDescOrder(
        response,
        sortByOrder,
        sortByKey
      );
      response = this.paginateArrayByPageSizeAndNumber(
        response,
        pageSize,
        pageNumber
      );
      return response;
    } catch (error: any) {}
  };

  static sortVideosByAnyKeyInDescOrder = async (
    response: any[],
    sortOrder: string = "desc",
    sortByKey: string
  ) => {
    try {
      response?.sort((a, b) => {
        return sortOrder === "desc"
          ? Date.parse(b?.[sortByKey]) - Date.parse(a?.[sortByKey])
          : Date.parse(a?.[sortByKey]) - Date.parse(b?.[sortByKey]);
      });
      response?.map((data) => {
        data.thumbnails = JSON.parse(data?.thumbnails);
      });
      return response;
    } catch (error: any) {}
  };

  public static getAllVideosByTitleOrDescription = async (
    searchString: String,
    pageNumber: number,
    pageSize: number
  ) => {
    try {
      let response = await VideoQueries.VideoModelGetByTitleOrDescriptionQuery(
        searchString
      );
      response = this.paginateArrayByPageSizeAndNumber(
        response,
        pageSize,
        pageNumber
      );
      return response;
    } catch (error: any) {}
  };
}

module.exports = VideoHelper;
