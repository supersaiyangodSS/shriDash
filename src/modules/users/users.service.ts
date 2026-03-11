import { AppError } from "@/errors/AppError";
import { HTTP_CODES } from "@/constants/httpCodes";
import { CreateUserDTO } from "@/modules/users/dto/createUser.dto";
import * as userRepository from "@/modules/users/users.repository";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

export const createUser = async (data: CreateUserDTO) => {
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
  const user = await userRepository.findByIdRepo(id);
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  const deletedUser = await userRepository.checkSoftDeletedUserRepo(id);
  if (deletedUser) throw new AppError("User is already deleted", HTTP_CODES.CONFLICT);
  return await userRepository.softDeleteUserRepo(id);
};

export const forceDeleteUser = async (id: string) => {
  const user = await userRepository.findByIdRepo(id);
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  return await userRepository.forceDeleteUserRepo(id);
};

export const restoreDeletedUser = async (id: string) => {
  const user = await userRepository.findByIdRepo(id);
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  const deletedUser = await userRepository.checkSoftDeletedUserRepo(id);
  if (!deletedUser) throw new AppError('User is not deleted', HTTP_CODES.NOT_FOUND);
  return await userRepository.restoreDeleteUserRepo(id);
};

export const updateUser = async (id: string, payload: UpdateUserDTO) => {
  const user = await userRepository.findByIdRepo(id);
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  const updatedUser = await userRepository.updateUserRepo(id, payload);
  return updatedUser;
}

export const updateUserPass = async (id: string, oldPassword: string, newPassword: string) => {
  const user = await userRepository.updateUserPassRepo(id, oldPassword, newPassword);
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  return user;
}

export const updateUserEmail = async (id: string, email: string) => {
  const user = await userRepository.updateUserEmailRepo(id, email);
  if (!user) throw new AppError("User not found", HTTP_CODES.NOT_FOUND);
  return user;
}