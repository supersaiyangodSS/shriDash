import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { env } from "@/config/env.config";
import { HTTP_CODES } from "@/constants/httpCodes";
import { AppError } from "@/errors/AppError";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.get("authorization");

        if (!header || !header.startsWith("Bearer ")) {
            throw new AppError('Token missing', HTTP_CODES.UNAUTHORIZED)
        }
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);

        (req as any).user = decoded;
        next();
    } catch (error) {
        next(error)
    }
}