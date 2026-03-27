import "@/modules/temple/temple.model";
import { HTTP_CODES } from "@/constants/httpCodes";
import { Sevekari } from "./sevekari.model";
import { SevekariDto } from "./sevekari.validator";
import { MESSAGE } from "@/constants/messages";
import { AppError } from "@/errors/AppError";
import { logger } from "@/utils/logger";

export const createSevekari = async (payload: SevekariDto) => {
  const existing = await Sevekari.exists({
    mobile: payload.mobile,
  });

  if (existing) {
    throw new AppError(
      MESSAGE.SEVEKARI.SEVEKARI_MOBILE_ALREADY_EXISTS,
      HTTP_CODES.CONFLICT,
    );
  }
  const payloadMod = { ...payload, templeId: "69c1712aa3e5a278a6ad5f7f" }; //move temple id to env
  const user = await Sevekari.create(payloadMod);
  return user.toObject({ versionKey: false });
};

export const getSevekari = async () => {
  const data = await Sevekari.find({ deleted: false }).populate("templeId");
  data.forEach((item) => {
    if (!item.templeId) {
      logger.warn("Missing temple id for sevekari");
    }
  });
  return data;
};

export const softDeleteSevekari = async (id: string) => {
  const user = await Sevekari.findOneAndUpdate(
    { _id: id, deleted: false },
    {
      $set: {
        deleted: true,
      },
    },
    { new: true, projection: { __v: 0 } },
  ).lean();
  if (!user)
    throw new AppError("User not found or deleted", HTTP_CODES.NOT_FOUND);
  return user;
};

export const forceDeleteSevekari = async (id: string) => {
  const user = await Sevekari.findByIdAndDelete({ _id: id }).lean();
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  return user;
};
