import { NextFunction, Request, Response } from "express";
import { loginService } from "@/modules/auth";
import { HTTP_CODES } from "@/constants/httpCodes";
import { successResponse } from "@/utils/response";
import { env, cookieOptions } from "@/config";
import { MESSAGE } from "@/constants/messages";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await loginService(req.body);
        res.cookie("token", token, {
            ...cookieOptions,
            maxAge: 24 * 60 * 60 * 1000,
        });
        successResponse(res, HTTP_CODES.OK, MESSAGE.AUTH.LOGIN_SUCCESS);
    } catch (error) {
        next(error)
    }
}

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
        });
        successResponse(res, HTTP_CODES.OK, MESSAGE.AUTH.LOGOUT_SUCCESS);
    } catch (error) {
        next(error);
    }
}
