import "dotenv/config";
import express from "express";
import { checkRssFeed } from "./functions/checkRssFeed";
import { deleteJsonFile } from "./functions/deleteJsonFIle";
const app = express();

// Variables used for the server
const port = process.env.PORT;
const rssFeedUrl = process.env.URL;

app.listen(port, () => {
  setInterval(() => deleteJsonFile(), 86400000);
  setInterval(async () => await checkRssFeed(rssFeedUrl), 20000);
});
