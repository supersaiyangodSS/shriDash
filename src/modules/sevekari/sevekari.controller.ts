import { HTTP_CODES } from "@/constants/httpCodes";
import { MESSAGE } from "@/constants/messages";
import { successResponse } from "@/utils/response";
import { NextFunction, Request, Response } from "express";
import { createSevekari } from "./sevekari.service";
import { SevekariDto } from "./sevekari.validator";

export const createSevekariController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload: SevekariDto = req.body;
    const result = await createSevekari(payload);
    successResponse(
      res,
      HTTP_CODES.CREATED,
      MESSAGE.SEVEKARI.SEVEKARI_CREATED_SUCCESS,
      result,
    );
  } catch (error) {
    next(error);
  }
};
