import rssParser from "rss-parser";
import fs from "fs";
import path from "path";
import { sendGig } from "./sendGig";
import { getPlainText } from "./getPlainText";

const jsonFilePath = path.join(__dirname, "../../gig.json");
const parser = new rssParser();

export const checkRssFeed = async (url: string) => {
  try {
    const feed = await parser.parseURL(url);
    if (feed && feed.items && feed.items.length > 0) {
      const gigs = feed.items.map((item) => ({
        title: getPlainText(item.title),
        link: item.link,
        date: getPlainText(item.pubDate),
        content: getPlainText(item.content),
      }));

      let existingGigs = [];
      try {
        if (fs.existsSync(jsonFilePath)) {
          const existingGigsBuffer = await fs.promises.readFile(jsonFilePath);
          existingGigs = JSON.parse(existingGigsBuffer.toString("utf-8"));
        }
      } catch (error) {
        console.error("Error reading JSON file:", error);
      }

      const newGigs = gigs.filter((gig) => {
        return !existingGigs.some(
          (existingGig) => existingGig.link === gig.link
        );
      });

      if (newGigs.length > 0) {
        const updatedGigs = [...existingGigs, ...newGigs];
        try {
          sendGig([newGigs[0]]);
          await fs.promises.writeFile(
            jsonFilePath,
            JSON.stringify(updatedGigs, null, 2)
          );
        } catch (error) {
          console.error("Error writing to JSON file:", error);
        }
      } else {
        console.log("No new gigs found");
      }
    }
  } catch (error) {
    console.error("Error fetching or parsing RSS feed:", error);
  }
};
