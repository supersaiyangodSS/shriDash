import { z } from "zod";

export const CreateUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('invalid email'),
    username: z.string().min(3, 'username must be at least 3 characters'),
    password: z.string().min(6, 'password must be at least 8 characters'),
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    email: z.string().email().optional(),
    username: z.string().min(3).optional(),
    password: z.string().min(8).optional()
});

export const UserIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user id")
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>