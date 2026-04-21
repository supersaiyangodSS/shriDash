import { CreateTempleDto } from "./temple.validator";
import { Temple } from "./temple.model";
import { AppError } from "@/errors/AppError";
import { HTTP_CODES } from "@/constants";

export const createTemple = async (payload: CreateTempleDto) => {
  const exists = await Temple.findOne({
    name: payload.name,
    branch: payload.branch,
    city: payload.city,
  });
  if (exists) throw new AppError("Temple already exists", HTTP_CODES.CONFLICT);
  const temple = await Temple.create(payload);

  return temple.toObject();
};
