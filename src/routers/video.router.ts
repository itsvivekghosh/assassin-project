import express from "express";

const videoRouter = express.Router();
const videoController = require("../controllers/video.controller");

videoRouter.get("/", async (req: any, res: any) => {
  try {
    let response = await videoController.getVideoResponse(req, res);
    res.status(200).send(response);
  } catch (error: any) {}
});

videoRouter.get("/getAllVideos", async (req: any, res: any) => {
  try {
    let response = await videoController.getAllVideoResponse(req, res);
    res.status(200).send(response);
  } catch (error: any) {}
});

videoRouter.get("/getByTitleOrDescription", async (req: any, res: any) => {
  try {
    let response =
      await videoController.getAllVideoModelGetByTitleOrDescriptionResponse(
        req,
        res
      );
    res.status(200).send(response);
  } catch (error: any) {}
});

module.exports = videoRouter;
