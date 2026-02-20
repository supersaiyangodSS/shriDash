import { AppError } from "../../errors/AppError";
import { HTTP_CODES } from "../../constants/httpCodes";
import { User } from "./users.model";
import { CreatUserDTO } from "./dto/createUser.dto";


export const createUser = async (data: CreatUserDTO) => {
  const existing = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  }).lean();

  if (existing) {
    if (existing.email === data.email) {
      throw new AppError("Email already exists", HTTP_CODES.CONFLICT);
    }

    if (existing.username === data.username ) {
      throw new AppError("Username already exists", HTTP_CODES.CONFLICT);
    }
  }

  const user = await User.create(data);
  return user.toObject();
};

export const getUsers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const users = await User.find({}).skip(skip).limit(limit).lean();

  const total = await User.countDocuments();
  const pages = Math.ceil(total / limit);

  return { users, total, page, pages };
};

export const softDeleteUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      deleted: true,
      deletedAt: new Date(),
    },
    { new: true },
  );

  if (!user) {
    throw new AppError("User not found", HTTP_CODES.BAD_REQUEST);
  }
  return user;
};

export const forceDeleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError("User not found", HTTP_CODES.BAD_REQUEST);
  }
  return user;
};

export const restoreDeletedUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, {
    deleted: false,
    deletedAt: null
  }, { new: true });

  if (!user) {
    throw new AppError("User not found", HTTP_CODES.BAD_REQUEST);
  }

  return user;
}