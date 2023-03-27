require("dotenv").config();
import axios, { AxiosError } from "axios";

const VideoQueries = require("../models/video.model");

class VideoHelper {
  static apiKey = process.env.GOOGLE_API_KEY;
  static apiUrl = process.env.YOUTUBE_API_URL;
  static maxResults = Number(process.env.MAX_FETCH_RESULTS);

  /*
    Call the youtube API and getting the response as per documented. 
  */
  public static async getVideoListFromYoutubeV3API(
    searchQuery: string,
    pageSize: number
  ) {
    try {
      if (pageSize && pageSize > Number(process.env.MAX_FETCH_RESULTS)) {
        this.maxResults = Number(pageSize);
      }

      let response: any;
      if (this.apiKey) {
        for (const apiKey of this.apiKey?.split(",")) {
          const GOOGLE_API_URL = `${this.apiUrl}/search?key=${apiKey}&type=video&part=snippet&maxResults=${this.maxResults}&q=${searchQuery}`;

          response = await axios(GOOGLE_API_URL).catch(
            (reason: AxiosError<any>) => {
              if (reason.response!.status === 400) {
                // Handle 400
                console.error(
                  `Getting Error while using the API_KEY: ${apiKey}, STATUS: ${
                    reason.response!.status
                  }, ERROR: ${reason?.message}`
                );
              }
            }
          );
          if (response?.status === 200) {
            break;
          }
        }
      } else {
        const errorMessage = `No API Keys, Please provide a valid GOOGLE_API_KEY`;
        console.error(errorMessage);
      }

      let result: any[] = [];
      response?.data?.items?.map((item: any) => {
        result.push({
          title: item?.snippet?.title,
          channelId: item?.snippet?.channelId,
          channelTitle: item?.snippet?.channelTitle,
          videoId: item?.id?.videoId,
          description: item?.snippet?.description,
          publishedAt: item?.snippet?.publishedAt,
          publishTime: item?.snippet?.publishTime,
          thumbnails: item?.snippet?.thumbnails,
        });
      });

      return result;
    } catch (err: any) {
      const errorMessage = `Error while fetching youtube video details: ${JSON.stringify(
        err?.message
      )}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }
  }

  /*
    Sort the response as per publishTime key and sortOrder.
  */
  public static async getSortedResponseforYoutubeV3APIResponse(
    response: any,
    sortByOrder: string
  ) {
    try {
      await response?.sort((a: any, b: any) => {
        return sortByOrder === "desc"
          ? Date.parse(b?.["publishTime"]) - Date.parse(a?.["publishTime"])
          : Date.parse(a?.["publishTime"]) - Date.parse(b?.["publishTime"]);
      });

      return response;
    } catch (err: any) {
      const errorMessage = `Error while sorting as per publish time details: ${JSON.stringify(
        err?.message
      )}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }
  }

  /*
    Appending the data in the database from the response.
  */
  public static async setYoutubeVideoResponseInDatabase(response: any) {
    try {
      let listData: any[] = [];

      response?.map(async (data: any) => {
        let object = {
          title: this.removeSpecials(data?.["title"]),
          channelId: data?.["channelId"],
          channelTitle: data?.["channelTitle"],
          videoId: data?.["videoId"],
          description: data?.["description"],
          publishedAt: data?.["publishedAt"],
          thumbnails: JSON.stringify(data?.["thumbnails"]),
          publishTime: data?.["publishTime"],
        };
        listData.push(object);
      });

      let resp = await VideoHelper.saveDataInDatabase(listData);

      if (resp?.status === "success")
        return {
          status: "success",
          message: "Data saved in DB!",
        };
      else {
        return {
          status: "error",
          message: "Error while saving the data in DB!",
        };
      }
    } catch (err: any) {
      const errorMessage = `Error while saving the data in DB!, Cause: ${JSON.stringify(
        err?.message
      )}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }
  }

  /* 
   Helper function to save the Data in the Database.
  */
  static async saveDataInDatabase(VideoObjectList: any[]) {
    try {
      VideoObjectList.forEach(async (VideoObject: any) => {
        await VideoQueries.VideoModelCreateQuery(VideoObject);
      });

      return {
        status: "success",
        message: "Data saved in DB!",
      };
    } catch (error: any) {
      const errorMessage = `ERROR while Saving the schema, Cause: ${JSON.stringify(
        error?.message
      )}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
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

  /*
    Removing special Characters from the given string.
  */
  static removeSpecials(str: any) {
    try {
      let lower = str.toLowerCase();
      let upper = str.toUpperCase();

      let res = "" as String,
        position = 0,
        length = lower.length,
        tempString;
      for (; position < length; ++position) {
        if (
          lower[position] !== upper[position] ||
          lower[position].trim() === ""
        ) {
          tempString = str[position];
          if (tempString !== undefined) {
            res += tempString;
          }
        }
      }

      return new String(res);
    } catch (error: any) {
      const errorMessage = `Error while removing special characters: ${JSON.stringify(
        error?.message
      )}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }
  }

  /*
    Fetching all the videos as per the SortKey and SortOrder.
  */
  public static getAllVideosByAnyKeyInSortingOrder = async (
    pageNumber: number,
    sortByOrder: string = "desc",
    sortByKey: string = "publishTime",
    pageSize: number
  ) => {
    try {
      let response = await VideoQueries.getVideosByAnyKeyQueryResponse(
        pageNumber,
        pageSize,
        sortByOrder,
        sortByKey
      );

      response?.map((data: any) => {
        data.thumbnails = JSON.parse(data?.thumbnails);
        // delete data?.created_at;
      });

      return response;
    } catch (error: any) {
      const errorMessage = `ERROR while getting the response from YT API, Cause: ${JSON.stringify(
        error?.message
      )}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }
  };

  /*
    Fetching all the videos from Database as per Search query in Title and Description columns.
  */
  public static getAllVideosByTitleOrDescription = async (
    searchString: String,
    pageNumber: number,
    pageSize: number,
    sortByOrder: string,
    sortByKey: string
  ) => {
    try {
      let response = await VideoQueries.VideoModelGetByTitleOrDescriptionQuery(
        searchString,
        pageNumber,
        pageSize,
        sortByOrder,
        sortByKey
      );
      response?.map((data: any) => {
        data.thumbnails = JSON.parse(data?.thumbnails);
      });
      return response;
    } catch (error: any) {
      const errorMessage = `ERROR while getting the response from DB, Cause: ${JSON.stringify(
        error?.message
      )}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }
  };
}

module.exports = VideoHelper;
