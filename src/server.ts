import "dotenv/config";
import app from "./app";
import { env } from "./config/env.config";
import { logger } from "./utils/logger";
import { connectDB } from "./config/db.config";

function startServer() {
  return new Promise((resolve, reject) => {
    const server = app.listen(env.PORT, resolve);
    server.on("error", reject);
  });
}

async function server() {
  try {
    await connectDB();
    await startServer();
    logger.info(`Server is on port ${env.PORT}`);
  } catch (error) {
    logger.error("Startup Failed: " + error);
    process.exit(1);
  }
}

async function startWithoutDB() {
  try {
    await startServer();
    logger.info("Server running without DB");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

if (env.NO_DB === "true") {
  startWithoutDB();
} else {
  server();
}
