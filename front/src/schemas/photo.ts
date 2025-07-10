import { z } from "zod";

export const photoSchema = z.object({
    alt: z.string(),
    avg_color: z.string(),
    id: z.string().uuid(),
    image_url: z.string().url(),
    liked: z.boolean(),
    photographer_name: z.string(),
    photographer_url: z.string().url(),
});

export type PhotoSchema = z.infer<typeof photoSchema>;
