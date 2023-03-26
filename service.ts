require("dotenv").config();
require("./src/configs/db.config");
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

const cookieParser = require("cookie-parser");
const fetchVideosAndSaveInDatabase = require("./src/configs/cronjob.config");

// Importing the http module
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const HTTP_PORT = process.env.HTTP_PORT;

app.use(
  "/",
  async (_: Request, res: Response, next: NextFunction) => {
    next();
  },
  require("./src/routers/index.router")
);

app.use(
  "/video",
  async (_: Request, res: Response, next: NextFunction) => {
    next();
  },
  require("./src/routers/video.router")
);

// Server listening to port 3000
app.listen(HTTP_PORT, () => {
  console.log(`Assassin\'s Server is Running on PORT: ${HTTP_PORT}.`);
});

fetchVideosAndSaveInDatabase();

module.exports = app;
