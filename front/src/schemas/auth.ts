import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().email(),
    password: z.string().min(4),
});

export type LoginSchema = z.infer<typeof loginSchema>;
