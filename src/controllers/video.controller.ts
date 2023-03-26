require("dotenv").config();
import { Request, Response } from "express";
const videoHelper = require("../helpers/video.helper");

class VideoController {
  static checkTheSortOrderValueMatches(value: string) {
    if (["asc", "desc"].includes(value)) {
      return true;
    }
    return false;
  }

  static checkTheSortKeysValueMatches(value: string) {
    if (["id", "publishedAt", "publishTime", "created_at"].includes(value)) {
      return true;
    }
    return false;
  }

  public static async getVideoResponse(request?: Request, response?: Response) {
    const searchParams = request?.query?.q || process.env.DEFAULT_SEARCH_VALUE;
    const sortByOrder = request?.query?.sortByOrder || "desc";
    const pageNumber = request?.query?.pageNumber || 1;
    const pageSize =
      request?.query?.pageSize || Number(process.env.DEFAULT_PAGE_SIZE);

    if (!this.checkTheSortOrderValueMatches(String(sortByOrder))) {
      const errorMessage = `wrong key for SORT_ORDER used as ${sortByOrder}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }

    let resp = await videoHelper.getVideoListFromYoutubeV3API(
      searchParams,
      pageSize
    );

    resp = videoHelper.paginateArrayByPageSizeAndNumber(
      resp,
      pageSize,
      pageNumber
    );

    resp = await videoHelper.getSortedResponseforYoutubeV3APIResponse(
      resp,
      sortByOrder
    );

    await videoHelper.setYoutubeVideoResponseInDatabase(resp);

    return {
      status: "success",
      data: resp,
    };
  }

  public static async getAllVideoResponse(request?: Request, _?: Response) {
    const sortByOrder = request?.query?.sortByOrder || "desc";
    const pageNumber = request?.query?.pageNumber || 1;
    const sortByKey = request?.query?.sortByKey;
    const pageSize =
      request?.query?.pageSize || Number(process.env.DEFAULT_PAGE_SIZE);

    if (!this.checkTheSortOrderValueMatches(String(sortByOrder))) {
      const errorMessage = `wrong key for SORT_ORDER used as ${sortByOrder}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }

    if (!this.checkTheSortKeysValueMatches(String(sortByKey))) {
      const errorMessage = `wrong key SORT_KEY used as ${sortByKey}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }

    let resp = await videoHelper.getAllVideosByAnyKeyInDescOrder(
      pageNumber,
      sortByOrder,
      sortByKey,
      pageSize
    );

    if (resp?.status === "success") {
      return {
        status: "success",
        data: resp,
      };
    } else {
      return resp;
    }
  }

  public static async getAllVideoModelGetByTitleOrDescriptionResponse(
    request: Request,
    _: Response
  ) {
    const pageNumber = request?.query?.pageNumber;
    const pageSize = request?.query?.pageSize;
    const searchQuery = request?.query?.searchQuery;
    const sortByOrder = request?.query?.sortByOrder;
    const sortByKey = request?.query?.sortByKey;

    if (!this.checkTheSortOrderValueMatches(String(sortByOrder))) {
      const errorMessage = `wrong key for SORT_ORDER used as ${sortByOrder}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }

    if (!this.checkTheSortKeysValueMatches(String(sortByKey))) {
      const errorMessage = `wrong key for SORT_KEY used as ${sortByKey}`;
      console.error(errorMessage);
      return {
        status: "error",
        message: errorMessage,
      };
    }

    let resp = await videoHelper.getAllVideosByTitleOrDescription(
      searchQuery,
      pageNumber,
      pageSize,
      sortByOrder,
      sortByKey
    );

    return {
      status: "success",
      data: resp,
    };
  }
}

module.exports = VideoController;
