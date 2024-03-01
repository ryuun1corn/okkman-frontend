import { z } from "zod";

export const createSponsorForEventSchema = z.object({
  name: z.string().min(1).max(255),
  package: z.enum(["SILVER", "GOLD", "PLATINUM"]),
});

export const associateSponsorAndEventSchema = z.object({
  sponsor_id: z.number().positive().int(),
  action: z.enum(["ADD", "REMOVE"]),
});
