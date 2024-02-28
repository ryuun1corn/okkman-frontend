import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function getAllCommittee() {
  const res = await prisma.committee.findMany({
    include: {
      group: true,
    },
  });

  return NextResponse.json({
    message: "Successfully get all committees.",
    data: res,
  });
}
