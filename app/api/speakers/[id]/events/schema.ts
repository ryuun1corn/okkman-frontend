import { z } from "zod";

export const associateSpeakerAndEventSchema = z.object({
  event_id: z.number().positive().int(),
  action: z.enum(["ADD", "REMOVE"]),
});
