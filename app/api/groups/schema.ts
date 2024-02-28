import { z } from "zod";

export const createGroupSchema = z.object({
  number: z.number().positive().int().lte(999),
  mentor_id: z.number().positive().int(),
});
