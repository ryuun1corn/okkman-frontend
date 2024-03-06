import { z } from "zod";

export const moveMenteeToGroupSchema = z.object({
  group_id: z.number().positive().int(),
});
