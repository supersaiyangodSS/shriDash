import { z } from "zod";

export const CreateUserValidator = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('invalid email'),
    username: z.string().min(3, 'username must be at least 3 characters'),
    password: z.string().min(6, 'password must be at least 8 characters'),
}).strict();

export const UpdateUserValidator = z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    username: z.string().min(3).optional()
}).strict();

export const UpdateUserPassValidator = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters')
}).strict();

export const UserIdValidator = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user id")
}).strict();

export type CreateUserInput = z.infer<typeof CreateUserValidator>;
export type UpdateUserInput = z.infer<typeof UpdateUserValidator>;
export type UserIdInput = z.infer<typeof UserIdValidator>;
export type UpdateUserPassInput = z.infer<typeof UpdateUserPassValidator>;