import { z } from "zod";

export const addSpeakerSchema = z.object({
  name: z.string().min(1),
});
