import { NextFunction, Request, Response } from "express";
import * as userService from "./user.service";
import mongoose from "mongoose";
import { HTTP_CODES } from "../../constants/httpCodes";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const payload = req.body;
        const user = await userService.createUser(payload);
        res.status(HTTP_CODES.CREATED).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await userService.getUsers(page, limit);

        return res.status(HTTP_CODES.OK).json({ success: true, ...result });
    } catch (error: any) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
};

export const softDeleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.params.id as string;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(HTTP_CODES.BAD_REQUEST)
                .json({ success: false, message: "Invalid user id" });
        }
        await userService.softDeleteUser(userId);
        res.status(HTTP_CODES.OK).json({ success: true, message: "User deleted" });
    } catch (error: any) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
};

export const forceDeleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(HTTP_CODES.BAD_REQUEST).json({ success: false, message: "Invalid user id" });
        }
        await userService.forceDeleteUser(userId);
        res.status(HTTP_CODES.OK).json({ success: true, message: 'User deleted' })
    } catch (error) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ success: true, message: 'Internal server error' });
    }
}

export const restoreDeletedUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id as string;
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({ success: false, message: "Invalid user id" });
            }
            await userService.restoreDeletedUser(userId);
            res.status(HTTP_CODES.OK).json({ success: true, message: 'User restored' });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
        }
}
