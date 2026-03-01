import { NextFunction, Request, Response } from "express";
import { loginService } from "@/modules/auth";
import { HTTP_CODES } from "@/constants/httpCodes";
import { successResponse } from "@/utils/response";
import { logger } from "@/utils/logger";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await loginService(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // todo: fix this
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        })

        successResponse(res, HTTP_CODES.OK, 'token', token);
    } catch (error) {
        next(error)
    }
}