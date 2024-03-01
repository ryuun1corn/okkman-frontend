import { z } from "zod";

export const createMentorAndGroupSchema = z.object({
  number: z.number().positive().int().lte(999),
  faculty: z.string().min(1).max(255),
  major: z.string().min(1).max(255),
  entrance_year: z.number().min(1900).max(2050).int(),
  mentor_name: z.string().min(1).max(255),
});
