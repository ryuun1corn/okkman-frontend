import prisma from "@/prisma/client";
import { BADAN_PENGURUS_HARIAN_TYPE, PENGURUS_INTI_TYPE } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleZodErrors } from "../utility";
import { addCommitteeSchema } from "./schema";
import { bphTypes } from "./types/route";

export async function hireNewCommittee(request: NextRequest) {
  const body = await request.json();
  const validation = addCommitteeSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        message: "Validation error",
        errors: handleZodErrors(validation.error.errors),
      },
      {
        status: 400,
      }
    );
  }

  const res = await prisma.committee.create({
    data: {
      name: validation.data.name,
      committeeType: bphTypes.includes(
        validation.data.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE
      )
        ? "BADAN_PENGURUS_HARIAN"
        : "PENGURUS_INTI",
      bphType: bphTypes.includes(
        validation.data.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE
      )
        ? (validation.data.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE)
        : null,
      pengurusIntiType: bphTypes.includes(
        validation.data.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE
      )
        ? null
        : (validation.data.committee_subtype as PENGURUS_INTI_TYPE),
    },
  });

  return NextResponse.json(
    { message: "Success: hired a new staff", data: res },
    { status: 201 }
  );
}
