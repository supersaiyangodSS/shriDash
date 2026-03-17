import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email("invalid email").trim().toLowerCase(),
    password: z
      .string()
      .min(8, "password must be at least 8 characters")
      .trim(),
  })
  .strict();

export type LoginDto = z.infer<typeof loginSchema>;
