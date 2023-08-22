import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
var logger = require("morgan");

const indexRouter = require("./routes/index");
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_DB_KEY;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
