import prisma from "@/prisma/client";
import { BADAN_PENGURUS_HARIAN_TYPE, PENGURUS_INTI_TYPE } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleZodErrors } from "../utility";
import { addCommitteeSchema } from "./schema";
import { bphTypes } from "./types/data";

export async function hireNewCommittee(request: NextRequest) {
  const body = await request.json();
  const validation = addCommitteeSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "There was something wrong with the data sent.",
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
      faculty: validation.data.faculty,
      major: validation.data.major,
      entrance_year: validation.data.entrance_year,
      committee_type: bphTypes.includes(
        validation.data.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE
      )
        ? "BADAN_PENGURUS_HARIAN"
        : "PENGURUS_INTI",
      bph_type: bphTypes.includes(
        validation.data.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE
      )
        ? (validation.data.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE)
        : null,
      pengurus_inti_type: bphTypes.includes(
        validation.data.committee_subtype as BADAN_PENGURUS_HARIAN_TYPE
      )
        ? null
        : (validation.data.committee_subtype as PENGURUS_INTI_TYPE),
    },
  });

  return NextResponse.json(
    { message: "Successfully hired a new committee.", data: res },
    { status: 201 }
  );
}
