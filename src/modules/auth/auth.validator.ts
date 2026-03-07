import { z } from 'zod';

export const LoginValidator = z.object({
    email: z.string().email('invalid email').min(5),
    password: z.string().min(8, 'password must be at least 8 characters')
}).strict();