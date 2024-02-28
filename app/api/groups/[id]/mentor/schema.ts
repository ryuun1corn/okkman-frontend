import { z } from "zod";

export const updateGroupMentorSchema = z.object({
  name: z.string().min(1).max(255),
});

export const changeMentorSchema = z.object({
  mentor_id: z.number(),
});
