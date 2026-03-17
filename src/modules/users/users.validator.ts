import { z } from "zod";

export const CreateUserSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("invalid email").trim().toLowerCase(),
    username: z
      .string()
      .min(3, "username must be at least 3 characters")
      .trim()
      .toLowerCase(),
    password: z.string().min(8, "password must be at least 8 characters"),
  })
  .strict();

export const UpdateUserSchema = z
  .object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    username: z.string().min(3).trim().toLowerCase().optional(),
  })
  .strict();

export const UpdateUserPassSchema = z
  .object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different",
    path: ["newPassword"],
  })
  .strict();

export const UserIdSchema = z
  .object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user id"),
  })
  .strict();

export const UserEmailSchema = z
  .object({
    email: z.string().email("invalid email").trim().toLowerCase(),
  })
  .strict();

export const TokenSchema = z
  .object({
    token: z.string().trim().min(1, "Token is required"),
  })
  .strict();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type UserIdInput = z.infer<typeof UserIdSchema>;
export type UpdateUserPassInput = z.infer<typeof UpdateUserPassSchema>;
export type UserEmailSchema = z.infer<typeof UserEmailSchema>;
export type TokenSchema = z.infer<typeof TokenSchema>;
