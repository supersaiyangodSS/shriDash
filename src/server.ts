import "dotenv/config";
import app from "@/app";
import { env } from "@/config";
import { logger } from "@/utils/logger";
import { connectDB } from "@/config/";

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

server();
