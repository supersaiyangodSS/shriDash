import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    MONGO_URI: z.string().min(1),
    NO_DB: z.string()
});

export const env = envSchema.parse(process.env);