import { NextFunction, Request, Response } from "express";
import * as userService from "@/modules/users/users.service";
import mongoose from "mongoose";
import { HTTP_CODES } from "@/constants/httpCodes";
import { successResponse } from "@/utils/response";
import { AppError } from "@/errors/AppError";
import { ROLES } from "@/constants/roles";
import { verifyEmail } from "@/modules/users/users.service";

export const createUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const payload = req.body;
        const user = await userService.createUser(payload);
        successResponse(res, HTTP_CODES.CREATED, 'User created', user);
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

export const updateUserPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        if ((req as any).user.role === ROLES.USER && (req as any).user.id !== id)
            throw new AppError("You can only set your own password", HTTP_CODES.FORBIDDEN);

        if (!mongoose.Types.ObjectId.isValid(id))
            throw new AppError('Invalid user id', HTTP_CODES.BAD_REQUEST);

        const result = await userService.updateUserPass(id, oldPassword, newPassword);

        successResponse(res, HTTP_CODES.OK, 'User password reset successful', result);
    } catch (error) {
        next(error);
    }
}

export const updateUserEmailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const email = req.body.email;

        if ((req as any).user.role === ROLES.USER && (req as any).user.id !== id) {
            throw new AppError('you can only set your own email', HTTP_CODES.FORBIDDEN);
        }
        if(!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError('Invalid user id', HTTP_CODES.BAD_REQUEST);
        }
        const result = await userService.updateUserEmail(id, email);
        successResponse(res, HTTP_CODES.OK, 'User email updated successfully', result);
    } catch (error) {
        next(error);
    }
}

export const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token as string;
        await verifyEmail(token);
        successResponse(res, HTTP_CODES.OK, 'Email verification successful');
    } catch (error) {
        next(error);
    }
}