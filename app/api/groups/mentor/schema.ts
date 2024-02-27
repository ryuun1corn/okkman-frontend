import { z } from "zod";

export const createMentorAndGroupSchema = z.object({
  number: z.number().positive().int().lte(999),
  mentor_name: z.string().min(1).max(255),
});
