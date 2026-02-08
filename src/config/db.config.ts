import mongoose from "mongoose";
import { logger } from "../utils/logger"
import { env } from "./env.config";

export const connectDB = async () => {
    await mongoose.connect(env.MONGO_URI);
    logger.info('MongoDB Conencted!');
}