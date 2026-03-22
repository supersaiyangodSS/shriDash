import { Schema, model } from "mongoose";
import { ISevekari } from "./sevekari.types";

const SevekariSchema = new Schema<ISevekari>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  mobileAlt: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export const Sevekari = model<ISevekari>("Sevekari", SevekariSchema);
