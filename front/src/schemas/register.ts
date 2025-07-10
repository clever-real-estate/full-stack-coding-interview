import { z } from "zod";

export const registerSchema = z.object({
	username: z.string().email(),
	password: z.string().min(4),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
