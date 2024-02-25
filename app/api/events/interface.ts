import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1).max(255),
  start_date: z
    .string()
    .refine((data) => !isNaN(Date.parse(data)), {
      message: "Invalid date format",
    })
    .transform((data) => new Date(data)),
  end_date: z
    .string()
    .refine((data) => !isNaN(Date.parse(data)), {
      message: "Invalid date format",
    })
    .transform((data) => new Date(data)),
  location: z.string().min(1).max(255),
  description: z.string().optional(),
});
