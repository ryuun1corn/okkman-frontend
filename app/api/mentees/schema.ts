import { z } from "zod";

export const addMenteeSchema = z.object({
  name: z.string().min(1).max(255),
  faculty: z.string().min(1).max(255),
  major: z.string().min(1).max(255),
  entrance_year: z.number().min(1900).max(2050).int(),
  entrance_method: z.enum(["SNBP", "SNBT", "MANDIRI", "BEASISWA"]),
  group_id: z.number().positive().int(),
});
