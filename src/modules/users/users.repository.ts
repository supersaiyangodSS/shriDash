import { AppError } from "@/errors/AppError";
import { CreatUserDTO } from "./dto/createUser.dto";
import { User } from "./users.model";
import { HTTP_CODES } from "@/constants/httpCodes";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

export const findByEmailorUsernameRepo = async (
  email: string,
  username: string,
) => {
  return User.findOne({
    $or: [{ email }, { username }],
  }).lean();
};

export const createUserRepo = async (data: CreatUserDTO) => {
  const user = await User.create(data);
  return user.toObject();
};

export const getUsersRepo = async (limit: number, skip: number) => {
  return await User.find({}).skip(skip).limit(limit).lean();
};

export const countUsersRepo = async () => {
  return await User.countDocuments();
};

export const softDeleteUserRepo = async (id: string) => {
  return await User.findByIdAndUpdate(
    id,
    {
      $set: {
        deleted: true,
        deletedAt: new Date(),
      },
    },
    { new: true, lean: true },
  );
};

export const forceDeleteUserRepo = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const restoreDeleteUserRepo = async (id: string) => {
  return await User.findByIdAndUpdate(
    id,
    {
      deleted: false,
      deletedAt: null,
    },
    { new: true, lean: true },
  );
};

export const findUserByIdRepo = async (id: string) => {
  const user = await User.findOne({ id });
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  return user;
}

export const findUserByUsernameRepo = async (username: string) => {
  const user = await User.findOne({ username });
  if(!user) throw new AppError("User not found", HTTP_CODES.CONFLICT);
  return user;
}

export const updateUserRepo = async (id: string, data: UpdateUserDTO) => {
  const user = await User.findById(id);

  if(!user) return null;

  if(data.username && data.username !== user.username) {
    const exists = await User.exists({ username: data.username, _id: { $ne: id } });
    if (exists) throw new AppError('Username already exists', HTTP_CODES.CONFLICT);
  }

  Object.assign(user, data);

  await user.save();
  return user.toObject();
}

export const updateUserPassRepo = async (id: string, password: string) => {
  const user = await User.findById(id).select('+password');
  if (!user) return null;

  const isSame = await user.comparePassword(password);
  if(isSame) throw new AppError("New password cannot be same as old password", HTTP_CODES.BAD_REQUEST);

  user.password = password;
  await user.save();
  return user.toObject();
}