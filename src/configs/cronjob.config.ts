require("dotenv").config();
const cron = require("node-cron");
const videoController = require("../controllers/video.controller");

const CRON_SCHEDULE_TIME = process.env.CRON_SCHEDULE_TIME;

const fetchVideosAndSaveInDatabase = () => {
  cron.schedule(`*/${CRON_SCHEDULE_TIME} * * * * *`, async function () {
    console.log(`Executing Cron in every ${CRON_SCHEDULE_TIME} seconds`);
    let response = await videoController.getVideoResponse();
    console.log(`Appended ${response?.data?.length} results in MySQL DB!`);
  });
};

module.exports = fetchVideosAndSaveInDatabase;
