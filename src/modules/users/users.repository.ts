import { CreatUserDTO } from "./dto/createUser.dto";
import { User } from "./users.model";

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
