import { NextFunction, Request, Response } from "express";
import * as userService from "@/modules/users/users.service";
import mongoose from "mongoose";
import { HTTP_CODES } from "@/constants/httpCodes";
import { successResponse } from "@/utils/response";
import { AppError } from "@/errors/AppError";
import { logger } from "@/utils/logger";

export const createUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const payload = req.body;
        const user = await userService.createUser(payload);
        successResponse(res, HTTP_CODES.OK, 'User created', user);
    } catch (error) {
        next(error);
    }
};

export const getUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await userService.getUsers(page, limit);
        successResponse(res, HTTP_CODES.OK, 'User fetched:', result)
    } catch (error: any) {
        next(error);
    }
};

export const softDeleteUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.params.id as string;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new AppError('Invalid user id', HTTP_CODES.BAD_REQUEST);
        }
        await userService.softDeleteUser(userId);
        successResponse(res, HTTP_CODES.OK, 'User deleted')
    } catch (error: any) {
        next(error);
    }
};

export const forceDeleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id as string;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new AppError('Invalid user id', HTTP_CODES.BAD_REQUEST);
        }
        await userService.forceDeleteUser(userId);
        successResponse(res, HTTP_CODES.OK, 'User deleted')
    } catch (error) {
        next(error);
    }
}

export const restoreDeletedUserController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id as string;
            if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new AppError('Invalid user id', HTTP_CODES.BAD_REQUEST);
            }
            const user = await userService.restoreDeletedUser(userId);
        successResponse(res, HTTP_CODES.OK, 'User restored', user);
        } catch (error) {
            next(error);
        }
}

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const userId = req.params.id as string;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new AppError('Invalid user id', HTTP_CODES.BAD_REQUEST);
        }
        const user = await userService.updateUser(userId, payload);
        successResponse(res, HTTP_CODES.OK, 'User updated', user);
    } catch (error) {
        next(error);
    }
}