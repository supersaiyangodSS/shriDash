import { z } from "zod";

export const SevekariSchema = z
  .object({
    firstName: z.string().trim().toLowerCase().min(1, "Invalid first name"),
    middleName: z.string().trim().toLowerCase().min(1, "Invalid middle name"),
    lastName: z.string().trim().toLowerCase().min(1, "Invalid last name"),
    mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number"),
    mobileAlt: z
      .string()
      .regex(/^[0-9]{10}$/, "Invalid alternate mobile number")
      .optional(),
    email: z.string().email().min(1).optional(),
    address: z.string().min(5, "Invalid Email"),
  })
  .strict();

export type SevekariDto = z.infer<typeof SevekariSchema>;
