import { Schema, model } from "mongoose";

const templeSchema = new Schema({
  name: String,
  city: String,
  district: String,
  state: String,
});

export const Temple = model("Temple", templeSchema);
