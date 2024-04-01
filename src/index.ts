import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  return console.log(`http://localhost:${port}`);
});
