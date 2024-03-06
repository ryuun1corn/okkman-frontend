import { z } from "zod";

export const associateSponsorAndEventSchema = z.object({
  event_id: z.number().positive().int(),
  action: z.enum(["ADD", "REMOVE"]),
});
