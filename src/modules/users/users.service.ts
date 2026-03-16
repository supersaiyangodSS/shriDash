import { AppError } from "@/errors/AppError";
import { HTTP_CODES } from "@/constants/httpCodes";
import { sendEmail } from "@/utils/nodemailer";
import { generateVerificationToken } from "@/utils/generateToken";
import { CreateUserDto, UpdateUserDto } from "./users.validator";
import { User } from "./users.model";

export const createUser = async (data: CreateUserDto) => {
  const existing = await User.findOne({
    $or: [
      { email: data.email },
      { username: data.username }
    ]
  })
  if (existing) {
    if (existing.email === data.email) {
      throw new AppError("Email already exists", HTTP_CODES.CONFLICT);
    }
    throw new AppError("Username already exists", HTTP_CODES.CONFLICT);
  }

  const token = generateVerificationToken();
  const userData = { ...data, token };
  const user = await User.create(userData);

  const verifyUrl = `http://localhost:4001/api/user/verify-email/${token}`;

  await sendEmail(data.email, 'Verify Email', `<a href="${verifyUrl}">Verify your email</a>`);
  const { password, token: _, ...safeUser } = user.toObject();
  return safeUser;
};

export const getUsers = async (page: number, limit: number) => {
  const safePage = Math.max(page, 1);
  const safeLimit = Math.max(limit, 1);
  const skip = (safePage - 1) * safeLimit;

  const users = await User.find()
    .skip(skip).limit(safeLimit).lean();

  const total = await User.countDocuments();
  const pages = Math.ceil(total / safeLimit);
  return { users, total, page: safePage, pages };
};

export const softDeleteUser = async (id: string) => {
   const user = await User.findOneAndUpdate(
   { _id: id, deleted: false },
    {
      $set: {
        deleted: true,
        deletedAt: new Date(),
      },
    },
    { new: true },
  ).lean();
  if (!user) throw new AppError("User not found or already deleted" , HTTP_CODES.NOT_FOUND);
  return user;
};

export const forceDeleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id).lean();
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  return user;
};

export const restoreDeletedUser = async (id: string) => {
  const user = await User.findOneAndUpdate(
    { _id: id, deleted: true },
    { $set: { deleted: false }, $unset: { deletedAt: "" } },
    { new: true }
  ).lean();
  if (!user) throw new AppError("User not found or not deleted", HTTP_CODES.NOT_FOUND);
  return user;
};

export const updateUser = async (id: string, payload: UpdateUserDto) => {

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  }

  if (payload.username) {
    const normlizedUsername = payload.username.trim().toLowerCase();

    if (user.username === normlizedUsername) {
      throw new AppError("Username must be different", HTTP_CODES.CONFLICT);
    }

    const exists = await User.exists({
      username: normlizedUsername,
      _id: { $ne: id }
    });

    if (exists) {
      throw new AppError("Username already exists", HTTP_CODES.CONFLICT);
    }
    user.username = normlizedUsername;
  }

  const { username, ...rest } = payload;
  Object.assign(user, rest);
  await user.save()
  return user.toObject({ versionKey: false });
  // const { password, ...safeUser } = user.toObject();
  // return safeUser;
}

export const updateUserPass = async (id: string, oldPassword: string, newPassword: string) => {
  const user = await User.findById(id).select("+password");

  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) throw new AppError("Invalid current password", HTTP_CODES.BAD_REQUEST);

  const isSame = await user.comparePassword(newPassword);
  if (isSame) throw new AppError("New password cannot be same as old password", HTTP_CODES.BAD_REQUEST);
  user.password = newPassword;

  await user.save();
  const userObj = user.toObject();
  const { password, ...safeUser } = userObj;
  return safeUser;
}

export const updateUserEmail = async (id: string, email: string) => {
  const normalizedEmail = email;
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);

  if(user.email === normalizedEmail) {
    throw new AppError("Email must be different from current email", HTTP_CODES.CONFLICT);
  }
  const existingUser = await User.exists({ email: normalizedEmail, _id: { $ne: id } });
  if (existingUser) throw new AppError("Email already exists", HTTP_CODES.CONFLICT);

  user.email = normalizedEmail;
  await user.save();
  return user;
}

export const verifyEmail = async (token: string) => {
  const user = await User.findOne({token}).select("+token");
  if (!user) throw new AppError("Invalid token", HTTP_CODES.BAD_REQUEST);

  user.verified = true;
  user.token = undefined;
  user.isTokenUsed = true;
  await user.save();
  return user.toObject({ versionKey: false })
}