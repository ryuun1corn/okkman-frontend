import { BADAN_PENGURUS_HARIAN_TYPE, PENGURUS_INTI_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function getCommitteeTypes(
  bphTypes: BADAN_PENGURUS_HARIAN_TYPE[],
  pengurusIntiTypes: PENGURUS_INTI_TYPE[]
) {
  return NextResponse.json({
    message: "Successfully get all committee type",
    data: {
      pengurus_inti: pengurusIntiTypes,
      bph: bphTypes,
    },
  });
}
