import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { env } from "@/config/env.config";
import { HTTP_CODES } from "@/constants/httpCodes";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.get("authorization");

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(HTTP_CODES.UNAUTHORIZED).json({ success: false, message: "Token missing" });
        }
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);

        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({ success: false, message: "Invalid token" });
    }
}