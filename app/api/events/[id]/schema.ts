import { z } from "zod";

export const updateEventSchema = z
  .object({
    name: z.string().min(1).max(255).optional(),
    start_date: z
      .string()
      .refine((data) => !isNaN(Date.parse(data)), {
        message: "Invalid date format",
      })
      .transform((data) => new Date(data))
      .optional(),
    end_date: z
      .string()
      .refine((data) => !isNaN(Date.parse(data)), {
        message: "Invalid date format",
      })
      .transform((data) => new Date(data))
      .optional(),
    location: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasProp = Object.keys(data).some((key) =>
        ["name", "start_date", "end_date", "location", "description"].includes(
          key
        )
      );

      return hasProp;
    },
    {
      message: "At least 1 of the field has to be updated.",
      path: ["name", "start_date", "end_date", "location", "description"],
    }
  );
