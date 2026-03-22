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

  const user = await Sevekari.create(payload);
  return user.toObject({ versionKey: false });
};
