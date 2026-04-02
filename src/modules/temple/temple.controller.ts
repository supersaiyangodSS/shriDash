import { Request, Response, NextFunction } from "express";
import { createTemple } from "@/modules/temple";
import { successResponse } from "@/utils/response";
import { HTTP_CODES } from "@/constants";
import { MESSAGE } from "@/constants";

export const createTempleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const result = await createTemple(payload);
    successResponse(res, HTTP_CODES.OK, MESSAGE.TEMPLE.TEMPLE_CREATED, result);
  } catch (error) {
    next(error);
  }
};
