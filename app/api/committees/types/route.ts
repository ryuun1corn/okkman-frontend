import { PENGURUS_INTI_TYPE, BADAN_PENGURUS_HARIAN_TYPE } from "@prisma/client";
import { getCommitteeTypes } from "./GET";
import { returnServerError } from "../../utility";

export const pengurusIntiTypes: PENGURUS_INTI_TYPE[] = [
  "PROJECT_OFFICER",
  "VICE_PROJECT_OFFICER_INTERNAL",
  "VICE_PROJECT_OFFICER_EXTERNAL",
  "SEKRETARIS_UMUM",
  "CONTROLLER",
  "TRASURER",
  "KOORDINATOR_BIDANG_ACARA",
  "KOORDINATOR_SARANA_DAN_PRASANARANA",
  "KOORDINATOR_OPERASIONAL",
  "KOORDINATOR_MATERI_DAN_MENTOR",
  "KOORDINATOR_KREATIF",
  "KOORDINATOR_RELASI",
] as const;

export const bphTypes: BADAN_PENGURUS_HARIAN_TYPE[] = [
  "PROJECT",
  "SPONSORSHIP",
  "KESEKRETARIATAN",
  "PSDM",
  "ACARA_PUNCAK",
  "EKSPLORASI",
  "TRANSPORTASI_DAN_KONSUMSI",
  "PERIZINAN",
  "LOGISTIK",
  "KEAMANAN",
  "MEDIS",
  "MEDIA_INFORMASI",
  "KELEMBAGAAN",
  "MATERI",
  "MENTOR",
  "MEDIA_PARTNER",
  "IT_DAN_BROADCAST",
  "DEKORASI_DAN_WARDROBE",
  "VISUAL_DESIGN_DAN_DOKUMENTASI",
] as const;

export async function GET() {
  try {
    return getCommitteeTypes(bphTypes, pengurusIntiTypes);
  } catch (error) {
    return returnServerError(error);
  }
}
