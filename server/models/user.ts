import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    time: [String],
    canvas: String,
  },
  { collection: "Users" }
);

module.exports = mongoose.model("User", UserSchema);
