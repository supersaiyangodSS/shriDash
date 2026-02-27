import { AppError } from "@/errors/AppError";
import { HTTP_CODES } from "@/constants/httpCodes";
import { CreatUserDTO } from "@/modules/users/dto/createUser.dto";
import * as userRepository from "@/modules/users/users.repository";

export const createUser = async (data: CreatUserDTO) => {
  const existing = await userRepository.findByEmailorUsernameRepo(
    data.email,
    data.username,
  );
  if (!existing) {
    return userRepository.createUserRepo(data);
  }
  if (existing.email === data.email) {
    throw new AppError("Email already exists", HTTP_CODES.CONFLICT);
  }
  throw new AppError("Username already exists", HTTP_CODES.CONFLICT);
};

export const getUsers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const users = await userRepository.getUsersRepo(limit, skip);
  const total = await userRepository.countUsersRepo();
  const pages = Math.ceil(total / limit);

  return { users, total, page, pages };
};

export const softDeleteUser = async (id: string) => {
  const user = await userRepository.softDeleteUserRepo(id);
  if (!user) {
    throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  }
  return user;
};

export const forceDeleteUser = async (id: string) => {
  const user = await userRepository.forceDeleteUserRepo(id);
  if (!user) {
    throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  }
  return user;
};

export const restoreDeletedUser = async (id: string) => {
  const user = await userRepository.restoreDeleteUserRepo(id);
  if (!user) {
    throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  }
  return user;
};
