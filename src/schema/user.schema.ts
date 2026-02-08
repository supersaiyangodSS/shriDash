import { z } from "zod";

export const createUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('invalid email'),
    username: z.string().min(3, 'username must be at least 3 characters'),
    password: z.string().min(6, 'password must be at least 8 characters'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>;