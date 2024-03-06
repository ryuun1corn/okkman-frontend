import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { addSpeakerSchema } from "./schema";
import { handleZodErrors } from "../utility";

export async function addSpeaker(request: NextRequest) {
  const body = await request.json();
  const validation = addSpeakerSchema.safeParse(body);
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

  const res = await prisma.speaker.create({
    data: {
      name: validation.data.name,
    },
  });

  return NextResponse.json(
    { message: "Successfully added a new speaker.", data: res },
    { status: 201 }
  );
}
