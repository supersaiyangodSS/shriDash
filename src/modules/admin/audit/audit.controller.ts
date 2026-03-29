import { NextFunction, Request, Response } from "express";
import { getAuditLogs } from "./audit.service";
import { successResponse } from "@/utils/response";
import { HTTP_CODES } from "@/constants/httpCodes";

export const getAuditLogsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await getAuditLogs(page, limit);
    successResponse(res, HTTP_CODES.OK, "Audit logs fetched", result);
  } catch (error) {
    next(error);
  }
};
