import "@/modules/temple/temple.model";
import { HTTP_CODES, MESSAGE } from "@/constants";
import { Sevekari } from "./sevekari.model";
import { SevekariDto, UpdateSevekariDto } from "./sevekari.validator";
import { AppError } from "@/errors/AppError";
import { logger } from "@/utils";
import { env } from "@/config";
import { Types } from "mongoose";

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
  const payloadMod = { ...payload, templeId: env.TEMPLE_ID };
  if (!env.TEMPLE_ID || env.TEMPLE_ID === "") {
    throw new AppError(
      MESSAGE.SEVEKARI.SEVEKARI_MISSING_TEMPLE_ID,
      HTTP_CODES.NOT_FOUND,
    );
  }
  const user = await Sevekari.create(payloadMod);
  return user.toObject({ versionKey: false });
};

export const getSevekari = async () => {
  const data = await Sevekari.find({ deleted: false }).populate("templeId");
  data.forEach((item) => {
    if (!item.templeId) {
      logger.warn(MESSAGE.SEVEKARI.SEVEKARI_MISSING_TEMPLE_ID);
    }
  });
  return data;
};

export const updateSevekari = async (
  id: string,
  payload: UpdateSevekariDto,
) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(
      MESSAGE.SEVEKARI.INVALID_SEVEKARI_ID,
      HTTP_CODES.BAD_REQUEST,
    );
  }

  const existing = await Sevekari.findById(id);
  if (!existing) {
    throw new AppError(
      MESSAGE.SEVEKARI.SEVEKARI_NOT_FOUND,
      HTTP_CODES.NOT_FOUND,
    );
  }
  const mobile = payload.mobile;
  if (mobile && mobile !== existing.mobile) {
    const mobileExists = await Sevekari.exists({
      mobile,
      _id: { $ne: id },
    });

    if (mobileExists) {
      throw new AppError(
        MESSAGE.SEVEKARI.SEVEKARI_MOBILE_ALREADY_EXISTS,
        HTTP_CODES.CONFLICT,
      );
    }
  }

  const updated = await Sevekari.findByIdAndUpdate(
    id,
    { ...payload },
    {
      new: true,
      runValidators: true,
    },
  );

  return updated!;
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
    throw new AppError(
      MESSAGE.SEVEKARI.SEVEKARI_NOT_FOUND_OR_DELETED,
      HTTP_CODES.NOT_FOUND,
    );
  return user;
};

export const restoreSoftDeletedSevekari = async (id: string) => {
  const user = await Sevekari.findOneAndUpdate(
    { _id: id, deleted: true },
    {
      $set: {
        deleted: false,
      },
    },
    { new: true },
  ).lean();
  if (!user)
    throw new AppError(
      MESSAGE.SEVEKARI.SEVEKARI_NOT_FOUND,
      HTTP_CODES.NOT_FOUND,
    );
};

export const forceDeleteSevekari = async (id: string) => {
  const user = await Sevekari.findByIdAndDelete({ _id: id }).lean();
  if (!user)
    throw new AppError(
      MESSAGE.SEVEKARI.SEVEKARI_NOT_FOUND,
      HTTP_CODES.NOT_FOUND,
    );
  return user;
};
