import { HTTP_CODES } from "@/constants/httpCodes";
import { MESSAGE } from "@/constants/messages";
import { successResponse } from "@/utils/response";
import { NextFunction, Request, Response } from "express";
import {
  createSevekari,
  forceDeleteSevekari,
  getSevekari,
  softDeleteSevekari,
} from "./sevekari.service";
import { SevekariDto } from "./sevekari.validator";

type Params = { id: string };

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

export const getSevekariController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getSevekari();
    successResponse(res, HTTP_CODES.OK, "Fetched sevekari", result);
  } catch (error) {
    next(error);
  }
};

export const softDeleteSevekariController = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await softDeleteSevekari(id);
    successResponse(res, HTTP_CODES.OK, "Sevekari deleted", result);
  } catch (error) {
    next(error);
  }
};

export const forceDeleteSevekariController = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await forceDeleteSevekari(id);
    successResponse(
      res,
      HTTP_CODES.OK,
      "Sevekari deleted or already deleted",
      result,
    );
  } catch (error) {
    next(error);
  }
};
