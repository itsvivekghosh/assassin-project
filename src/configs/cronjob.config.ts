require("dotenv").config();
const cron = require("node-cron");
const videoController = require("../controllers/video.controller");

const CRON_SCHEDULE_TIME = process.env.CRON_SCHEDULE_TIME;

const fetchVideosAndSaveInDatabase = () => {
  cron.schedule(`*/${CRON_SCHEDULE_TIME} * * * * *`, async function () {
    console.log(`Executing Cron in every ${CRON_SCHEDULE_TIME} seconds`);
    await videoController.getVideoResponse();
  });
};

module.exports = fetchVideosAndSaveInDatabase;
