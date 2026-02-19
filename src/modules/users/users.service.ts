import { HTTP_CODES } from "../../constants/httpCodes";
import { User } from "./users.model";

export const createUser = async (data: any) => {
  const existing = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  }).lean();

  if (existing) {
    if (existing.email === data.email) {
      const err: any = new Error("Email already exists");
      err.statusCode = HTTP_CODES.CONFLICT;
      throw err;
    }

    if (existing.username === data.username ) {
      const err: any = new Error("Username already exists");
      err.statusCode = HTTP_CODES.CONFLICT;
      throw err;
    }
  }

  const user = await User.create(data);
  console.log(data);
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
    const err: any = new Error("User not found");
    err.statusCode = HTTP_CODES.BAD_REQUEST;
    throw err;
  }
  return user;
};

export const forceDeleteUser = (id: string) => {
  const user = User.findByIdAndDelete(id);
  if (!user) {
    const err: any = new Error("User not found");
    err.statusCode = HTTP_CODES.BAD_REQUEST;
    throw err;
  }
  return user;
};

export const restoreDeletedUser = (id: string) => {
  const user = User.findByIdAndUpdate(id, {
    deleted: false,
    deletedAt: null
  }, { new: true });

  if (!user) {
    const err: any = new Error('User not found');
    err.statusCode = HTTP_CODES.BAD_REQUEST;
    throw err;
  }

  return user;
}