import { CreateTempleDto } from "./temple.validator";
import { Temple } from "./temple.model";
import { AppError } from "@/errors/AppError";
import { HTTP_CODES } from "@/constants";
import { User } from "../users";

export const createTemple = async (payload: CreateTempleDto) => {
  const exists = await Temple.findOne({
    name: payload.name,
    branch: payload.branch,
    city: payload.city,
  });
  if (exists) throw new AppError("Temple already exists", HTTP_CODES.CONFLICT);
  const temple = await Temple.create(payload);

  return temple.toObject({ versionKey: false });
};

export const getTemple = async (page: number, limit: number) => {
  const safePage = Math.max(page, 1);
  const safeLimit = Math.max(limit, 1);
  const skip = (safePage - 1) * safeLimit;

  const users = await Temple.find({}, { __v: 0 })
    .skip(skip)
    .limit(safeLimit)
    .lean();
  const total = await Temple.countDocuments();
  const pages = Math.ceil(total / safeLimit);
  return { users, total, page: safePage, pages };
};
