import express, { Request, Response } from "express";
import { STATUS_CODES } from "../constants/response.constants";

const videoRouter = express.Router();
const videoController = require("../controllers/video.controller");

videoRouter.get("/", async (req: any, res: any) => {
  try {
    let response = await videoController.getVideoResponse(req, res);

    if (response?.status === "error") {
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(response);
    } else {
      return res.status(STATUS_CODES.OK_HTTP_RESPONSE).send(response);
    }
  } catch (error: any) {
    const errorMessage = `ERROR GET /videos API, Cause: ${JSON.stringify(
      error?.message
    )}`;
    console.error(errorMessage);
    res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: errorMessage,
    });
  }
});

videoRouter.get("/getAllVideos", async (req: any, res: any) => {
  try {
    let response = await videoController.getAllVideoResponse(req, res);
    if (response?.status === "error") {
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(response);
    }

    return res.status(STATUS_CODES.OK_HTTP_RESPONSE).send(response);
  } catch (error: any) {
    const errorMessage = `ERROR GET /getAllVideos API, Cause: ${JSON.stringify(
      error?.message
    )}`;
    console.error(errorMessage);
    res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: errorMessage,
    });
  }
});

videoRouter.get("/getByTitleOrDescription", async (req: any, res: any) => {
  try {
    let response =
      await videoController.getAllVideoModelGetByTitleOrDescriptionResponse(
        req,
        res
      );
    if (response?.status === "error") {
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(response);
    }

    return res.status(STATUS_CODES.OK_HTTP_RESPONSE).send(response);
  } catch (error: any) {
    const errorMessage = `ERROR GET /getByTitleOrDescription API, Cause: ${JSON.stringify(
      error?.message
    )}`;
    console.error(errorMessage);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: errorMessage,
    });
  }
});

module.exports = videoRouter;
