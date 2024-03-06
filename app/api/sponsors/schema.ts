import { z } from "zod";

export const addSponsorSchema = z.object({
  name: z.string().min(1),
  package: z.enum(["SILVER", "GOLD", "PLATINUM"]),
});
