import { z } from "zod";

export const createMentorAndGroupSchema = z.object({
  number: z.number().positive(),
  mentor_name: z.string().min(1).max(255),
});
