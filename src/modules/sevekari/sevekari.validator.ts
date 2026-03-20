import { z } from "zod";

export const SevekariSchema = z
  .object({
    firstName: z.string().trim().toLowerCase().min(1, "Invalid first name"),
    lastName: z.string().trim().toLowerCase().min(1, "Invalid last name"),
    mobile: z.number().min(10, "Invalid Number"),
    mobileAlt: z.number().min(10, "Invalid Number"),
    email: z.string().email().min(3, "Invalid Email"),
    address: z.string().min(3, "Invalid Email"),
  })
  .strict();

export type SevekariDto = z.infer<typeof SevekariSchema>;
