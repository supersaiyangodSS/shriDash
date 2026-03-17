import express, { urlencoded } from "express";
import { errorHandler } from "@/middleware/errorHandler.middleware";
import dns from "node:dns";
import apiRouter from "@/router/router";
import { apiLimiter, globalLimiter } from "@/config";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import compression from "compression";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "@/config/swagger.config";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(globalLimiter);
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:4001"],
    credentials: true,
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(hpp());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api", apiLimiter, apiRouter);
app.use(errorHandler);

export default app;
