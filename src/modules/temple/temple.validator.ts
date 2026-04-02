import { z } from "zod";

export const CreateTempleSchema = z
  .object({
    name: z.string().trim().toLowerCase().min(1, "Temple name is required"),
    city: z.string().trim().toLowerCase().min(1, "City name is required"),
    branch: z.string().trim().toLowerCase().min(1, "Temple branch is required"),
    district: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "District name is required"),
    state: z.string().trim().toLowerCase().min(1, "State name is required"),
  })
  .strict();

export type CreateTempleDto = z.infer<typeof CreateTempleSchema>;
