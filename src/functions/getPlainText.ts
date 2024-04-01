import * as cheerio from "cheerio";

export const getPlainText = (htmlContent: string) => {
  const $ = cheerio.load(htmlContent);
  return $.text();
};
