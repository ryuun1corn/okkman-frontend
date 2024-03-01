import { z } from "zod";

export const createSponsorForEventSchema = z.object({
  name: z.string().min(1).max(255),
  package: z.enum(["SILVER", "GOLD", "PLATINUM"]),
});
