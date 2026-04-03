import { HTTP_CODES } from "@/constants/httpCodes";
import { MESSAGE } from "@/constants/messages";
import { successResponse } from "@/utils/response";
import { NextFunction, Request, Response } from "express";
import {
  createSevekari,
  forceDeleteSevekari,
  getSevekari,
  restoreSoftDeletedSevekari,
  softDeleteSevekari,
  updateSevekari,
} from "./sevekari.service";
import { SevekariDto, UpdateSevekariDto } from "./sevekari.validator";
import { logger } from "@/utils/logger";
import { Sevekari } from "./sevekari.model";
import { AppError } from "@/errors/AppError";

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

export const updateSevekariController = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const result = await updateSevekari(id, payload);
    successResponse(res, HTTP_CODES.OK, "Fetched updated sevekari", result);
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

export const restoreSoftDeletedSevekariController = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await restoreSoftDeletedSevekari(id);
    successResponse(res, HTTP_CODES.OK, "Sevekari restored", result);
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
