import { z } from "zod";

export const updateGroupSchema = z.object({
  group_number: z.number().positive().int().lte(999),
});
