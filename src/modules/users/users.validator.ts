import { z } from "zod";

export const CreateUserValidator = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('invalid email').trim().toLowerCase(),
    username: z.string().min(3, 'username must be at least 3 characters').trim().toLowerCase(),
    password: z.string().min(8, 'password must be at least 8 characters'),
}).strict();

export const UpdateUserValidator = z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    username: z.string().min(3).trim().toLowerCase().optional()
}).strict();

export const UpdateUserPassValidator = z.object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8)
}).refine(data => data.oldPassword !== data.newPassword, {
    message: "New password must be different",
    path: ["newPassword"]
}).strict();

export const UserIdValidator = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user id")
}).strict();

export const UserEmailValidator = z.object({
    email: z.string().email('invalid email').trim().toLowerCase()
}).strict();

export const TokenValidator = z.object({
    token: z.string().trim().min(1, "Token is required")
}).strict();

export type CreateUserInput = z.infer<typeof CreateUserValidator>;
export type UpdateUserInput = z.infer<typeof UpdateUserValidator>;
export type UserIdInput = z.infer<typeof UserIdValidator>;
export type UpdateUserPassInput = z.infer<typeof UpdateUserPassValidator>;
export type UserEmailValidator = z.infer<typeof UserEmailValidator>;
export type TokenValidator = z.infer<typeof TokenValidator>;