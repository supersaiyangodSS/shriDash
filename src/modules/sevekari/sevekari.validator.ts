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
      .trim()
      .optional(),
    email: z.string().email().trim().min(1).toLowerCase().optional(),
    address: z.string().min(5, "Invalid address").toLowerCase(),
  })
  .strict();

export const UpdateSevekariSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Invalid first name")
      .optional(),
    middleName: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Invalid middle name")
      .optional(),
    lastName: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Invalid last name")
      .optional(),
    mobile: z
      .string()
      .regex(/^[0-9]{10}$/, "Invalid mobile number")
      .optional(),
    mobileAlt: z
      .string()
      .regex(/^[0-9]{10}$/, "Invalid alternate mobile number")
      .trim()
      .optional(),
    address: z
      .string()
      .trim()
      .toLowerCase()
      .min(5, "Invalid address")
      .optional(),
  })
  .strict();

export const SevekariIdSchema = z
  .object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid sevekari id"),
  })
  .strict();

export type UpdateSevekariDto = z.infer<typeof UpdateSevekariSchema>;
export type SevekariDto = z.infer<typeof SevekariSchema>;
