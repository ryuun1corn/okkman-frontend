import { NextResponse } from "next/server";

export async function GET() {
  const pengurusIntiTypes: string[] = [
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
  ];

  const bphTypes: string[] = [
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
  ];

  return NextResponse.json({
    message: "Successfully get all committee type",
    types: {
      pengurus_inti: pengurusIntiTypes,
      bph: bphTypes,
    },
  });
}
