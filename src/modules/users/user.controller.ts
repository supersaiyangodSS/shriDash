import { NextFunction, Request, Response } from "express";
import * as userService from './user.service';
import { logger } from "../../utils/logger";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const user = await userService.createUser(payload);
        res.status(201).json({ success: true, data: user});
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await userService.getUsers(page, limit);

        return res.status(200).json({ success: true, ...result });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const softDeleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id as string;
        const user = await userService.softDeleteUser(userId);
        if (!user){
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        res.status(200).json({ success: true, message: 'User deleted' })
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}