import mongoose from "mongoose";
import { logger } from "@/utils/logger";
import { env } from "@/config/env.config";

export const connectDB = async () => {
  await mongoose.connect(env.MONGO_URI, {
    serverSelectionTimeoutMS: 1000,
    socketTimeoutMS: 2000,
    family: 4,
  });
  logger.info("MongoDB Conencted!");
};
