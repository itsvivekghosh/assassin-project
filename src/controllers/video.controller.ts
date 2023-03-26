require("dotenv").config();
import { Request, Response } from "express";
const videoHelper = require("../helpers/video.helper");

class VideoController {
  public static async getVideoResponse(request?: Request, _?: Response) {
    const searchParams = request?.query?.q || process.env.DEFAULT_SEARCH_VALUE;
    const sortByOrder = request?.query?.sortByOrder || "desc";
    const pageNumber = request?.query?.pageNumber || 1;
    const pageSize = request?.query?.pageSize || process.env.DEFAULT_PAGE_SIZE;

    let resp = await videoHelper.getVideoListFromYoutubeV3API(searchParams);

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
      message: "success",
      data: resp,
    };
  }

  public static async getAllVideoResponse(request?: Request, _?: Response) {
    const pageNumber = request?.query?.pageNumber;
    const sortByOrder = request?.query?.sortByOrder;
    const sortByKey = request?.query?.sortByKey;
    const pageSize = request?.query?.pageSize;

    let resp = await videoHelper.getAllVideosByAnyKeyInDescOrder(
      pageNumber,
      sortByOrder,
      sortByKey,
      pageSize
    );

    return {
      message: "success",
      data: resp,
    };
  }

  public static async getAllVideoModelGetByTitleOrDescriptionResponse(
    request: Request,
    _: Response
  ) {
    const pageNumber = request?.query?.pageNumber;
    const pageSize = request?.query?.pageSize;
    const searchQuery = request?.query?.searchQuery;

    let resp = await videoHelper.getAllVideosByTitleOrDescription(
      searchQuery,
      pageNumber,
      pageSize
    );

    return {
      message: "success",
      data: resp,
    };
  }
}

module.exports = VideoController;
