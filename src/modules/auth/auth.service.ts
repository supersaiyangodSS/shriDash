import jwt from "jsonwebtoken";
import { env } from "@/config";
import { LoginDto } from "./auth.validator";
import { AuthUser } from "./auth.types";
import { AppError } from "@/errors/AppError";
import { HTTP_CODES, MESSAGE } from "@/constants";
import { User } from "@/modules/users";

export const generateTokenService = (payload: AuthUser) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
};

export const loginService = async (payload: LoginDto) => {
  const user = await User.findOne({
    email: payload.email,
    deleted: false,
    verified: true,
  }).select("+password");

  if (!user) {
    throw new AppError(
      MESSAGE.AUTH.INVALID_CREDENTIALS,
      HTTP_CODES.UNAUTHORIZED,
    );
  }

  const isPasswordValid = await user.comparePassword(payload.password);

  if (!isPasswordValid) {
    throw new AppError(
      MESSAGE.AUTH.INVALID_CREDENTIALS,
      HTTP_CODES.UNAUTHORIZED,
    );
  }
  const { _id, role } = user;

  const token = generateTokenService({ id: _id.toString(), role });

  return token;
};
