import { NextFunction, Request, Response } from "express";
import * as userService from "./user.service";
import { logger } from "../../utils/logger";
import mongoose from "mongoose";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const payload = req.body;
        const user = await userService.createUser(payload);
        res.status(201).json({ success: true, data: user });
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

        return res.status(200).json({ success: true, ...result });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
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
                .status(400)
                .json({ success: false, message: "Invalid user id" });
        }
        const user = await userService.softDeleteUser(userId);
        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const forceDeleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }
        const user = await userService.forceDeleteUser(userId);
        res.status(200).json({ success: true, message: 'User deleted' })
    } catch (error) {

    }
}