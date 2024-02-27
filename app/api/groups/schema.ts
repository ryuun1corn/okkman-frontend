import { z } from "zod";

export const createGroupSchema = z.object({
  number: z.number(),
  mentor_id: z.number(),
});
