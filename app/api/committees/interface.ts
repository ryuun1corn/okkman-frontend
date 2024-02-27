import { z } from "zod";
import { pengurusIntiTypes, bphTypes } from "./types/route";
import {
  BADAN_PENGURUS_HARIAN_TYPE,
  COMMITTEE_TYPE,
  PENGURUS_INTI_TYPE,
} from "@prisma/client";

export const addCommitteeSchema = z.object({
  name: z.string().min(1).max(255),
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
  groupId: z.number().optional(),
});
