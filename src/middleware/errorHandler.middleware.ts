import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";
import { HTTP_CODES } from "@/constants/httpCodes";
import { AppError } from "@/errors/AppError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }

    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Something went wrong" });
}
