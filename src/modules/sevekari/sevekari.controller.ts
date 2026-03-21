import { HTTP_CODES } from "@/constants/httpCodes";
import { MESSAGE } from "@/constants/messages";
import { successResponse } from "@/utils/response";
import { NextFunction, Request, Response } from "express";
import { createSevekari } from "./sevekari.service";

export const createSevekariController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const result = await createSevekari(payload);
    successResponse(
      res,
      HTTP_CODES.OK,
      MESSAGE.SEVEKARI.SEVEKARI_CREATED_SUCCESS,
      result,
    );
  } catch (error) {
    next(error);
  }
};
