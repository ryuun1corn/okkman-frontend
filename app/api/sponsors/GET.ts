import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function getAllSponsors() {
  const res = await prisma.sponsor.findMany({
    include: {
      events: true,
    },
  });

  return NextResponse.json({
    message: "Successfully get all sponsors.",
    data: res,
  });
}
