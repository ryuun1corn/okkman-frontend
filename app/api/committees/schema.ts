import { z } from "zod";
import { pengurusIntiTypes, bphTypes } from "./types/data";
import { BADAN_PENGURUS_HARIAN_TYPE, PENGURUS_INTI_TYPE } from "@prisma/client";

export const addCommitteeSchema = z.object({
  name: z.string().min(1).max(255),
  faculty: z.string().min(1).max(255),
  major: z.string().min(1).max(255),
  entrance_year: z.number().min(1900).max(2050).int(),
  committee_subtype: z
    .string()
    .refine(
      (data) => {
        if (
          pengurusIntiTypes.includes(data as PENGURUS_INTI_TYPE) ||
          bphTypes.includes(data as BADAN_PENGURUS_HARIAN_TYPE)
        )
          return true;

        return false;
      },
      { message: "Invalid type not in ENUM" }
    )
    .transform((data) => {
      const index = pengurusIntiTypes.indexOf(data as PENGURUS_INTI_TYPE);

      if (index !== -1) return data as PENGURUS_INTI_TYPE;

      return data as BADAN_PENGURUS_HARIAN_TYPE;
    }),
});
