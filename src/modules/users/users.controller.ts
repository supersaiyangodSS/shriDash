import { NextFunction, Request, Response } from "express";
import * as userService from "./users.service";
import mongoose from "mongoose";
import { HTTP_CODES, MESSAGE, ROLES } from "@/constants";
import { successResponse } from "@/utils";
import { AppError } from "@/errors/AppError";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const user = await userService.createUser(payload);
    successResponse(res, HTTP_CODES.CREATED, MESSAGE.USER.USER_CREATED, user);
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
    successResponse(res, HTTP_CODES.OK, MESSAGE.USER.USER_FETCHED, result);
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
      throw new AppError(MESSAGE.USER.INVALID_USER_ID, HTTP_CODES.BAD_REQUEST);
    }
    await userService.softDeleteUser(userId);
    successResponse(res, HTTP_CODES.OK, MESSAGE.USER.USER_DELETED);
  } catch (error: any) {
    next(error);
  }
};

export const forceDeleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(MESSAGE.USER.INVALID_USER_ID, HTTP_CODES.BAD_REQUEST);
    }
    await userService.forceDeleteUser(userId);
    successResponse(res, HTTP_CODES.OK, MESSAGE.USER.USER_DELETED);
  } catch (error) {
    next(error);
  }
};

export const restoreDeletedUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(MESSAGE.USER.INVALID_USER_ID, HTTP_CODES.BAD_REQUEST);
    }
    const user = await userService.restoreDeletedUser(userId);
    successResponse(res, HTTP_CODES.OK, MESSAGE.USER.USER_RESTORED, user);
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const userId = req.params.id as string;
    const actorRole = (req as any).user.role;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(MESSAGE.USER.INVALID_USER_ID, HTTP_CODES.BAD_REQUEST);
    }
    const user = await userService.updateUser(userId, payload, actorRole);
    successResponse(res, HTTP_CODES.OK, MESSAGE.USER.USER_UPDATED, user);
  } catch (error) {
    next(error);
  }
};

export const updateUserPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const actorRole = req.body.role;

    if ((req as any).user.role === ROLES.USER && (req as any).user.id !== id)
      throw new AppError(
        MESSAGE.USER.YOU_CAN_ONLY_SET_YOUR_OWN_PASSWORD,
        HTTP_CODES.FORBIDDEN,
      );

    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(MESSAGE.USER.INVALID_USER_ID, HTTP_CODES.BAD_REQUEST);

    const result = await userService.updateUserPass(
      id,
      oldPassword,
      newPassword,
      actorRole,
    );

    successResponse(
      res,
      HTTP_CODES.OK,
      MESSAGE.USER.USER_PASSWORD_RESET_SUCCESSFUL,
      result,
    );
  } catch (error) {
    next(error);
  }
};

export const updateUserEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const email = req.body.email;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(MESSAGE.USER.INVALID_USER_ID, HTTP_CODES.BAD_REQUEST);
    }

    const result = await userService.updateUserEmail(
      id,
      email,
      (req as any).user.role,
      (req as any).user.id,
    );

    successResponse(
      res,
      HTTP_CODES.OK,
      MESSAGE.USER.USER_EMAIL_UPDATED_SUCCESSFUL,
      result,
    );
  } catch (error) {
    next(error);
  }
};

export const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.params.token as string;
    await userService.verifyEmail(token);
    successResponse(
      res,
      HTTP_CODES.OK,
      MESSAGE.USER.EMAIL_VERIFICATION_SUCCESSFUL,
    );
  } catch (error) {
    next(error);
  }
};

export const meController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = (req as any).user.id;
    const result = await userService.me(id);
    successResponse(res, HTTP_CODES.OK, MESSAGE.USER.USER_FETCHED, result);
  } catch (error) {
    next(error);
  }
};
