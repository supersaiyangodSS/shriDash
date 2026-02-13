import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { env } from "../config/env.config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.get("authorization");

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);

        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}