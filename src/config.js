require("dotenv").config();

module.exports = {
  token: process.env.BOT_TOKEN,
  prefix: process.env.BOT_PREFIX,
  youtubeKey: process.env.API_YOUTUBE_KEY,
};
