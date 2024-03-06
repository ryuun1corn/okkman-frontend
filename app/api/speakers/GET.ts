import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function getAllSpeakers() {
  const res = await prisma.speaker.findMany({
    include: {
      events: true,
    },
  });

  return NextResponse.json({
    message: "Successfully get all speakers.",
    data: res,
  });
}
