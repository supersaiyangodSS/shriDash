import { HTTP_CODES } from "@/constants/httpCodes";
import { Sevekari } from "./sevekari.model";
import { SevekariDto } from "./sevekari.validator";
import { MESSAGE } from "@/constants/messages";
import { AppError } from "@/errors/AppError";

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
  return await Sevekari.find().populate("Temple");
};
