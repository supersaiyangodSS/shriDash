import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { HTTP_CODES } from "../constants/httpCodes";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // logger.info('Error Handler Middleware')
    logger.error(err.message);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message || "Something went wrong" });
}
