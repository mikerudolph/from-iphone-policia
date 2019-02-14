require("dotenv-safe").config();
const Twitter = require("twitter-lite");
const fs = require("fs");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_KEY_SECRET
});

const appleTest = /iphone|ipad/
const adTest = /#ad/

const trackList = fs.readFileSync("track.txt").toString().replace(/\n/g, ",");

client.stream("statuses/filter", {
  track: trackList
})
  .on("start", response => console.log("start"))
  .on("data", handleTweet)
  .on("ping", () => console.log("ping"))
  .on("error", err => console.log("error", err))
  .on("end", () => console.log("end"));

function handleTweet(tweet) {
  // ignore retweets
  if (tweet.retweeted_status !== undefined) {
    return;
  }
  // ignore anything not from an Apple device
  if (!tweet.source.toLowerCase().match(appleTest)) {
    return;
  }
  // something to emphasize on later
  if (tweet.text.toLowerCase().match(adTest)) {
    console.log("ad alert!");
  }

  // temporary output
  console.log(tweet);
}