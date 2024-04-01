import fs from "fs";
import path from "path";

const jsonFilePath = path.join(__dirname, "../../gig.json");

export const deleteJsonFile = () => {
  fs.unlink(jsonFilePath, (err) => {
    if (err) {
      console.error("Error deleting JSON file:", err);
    } else {
      console.log("JSON file deleted successfully");
    }
  });
};
