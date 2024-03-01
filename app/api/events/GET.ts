import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function getAllEvents() {
  const res = await prisma.event.findMany({
    include: {
      sponsors: true,
      speakers: true,
    },
  });

  return NextResponse.json({
    message: "Successfully get all events.",
    data: res,
  });
}
