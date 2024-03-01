import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function getAllMentees() {
  const res = await prisma.mentee.findMany({
    include: {
      group: true,
    },
  });

  return NextResponse.json({
    message: "Successfully get all mentees.",
    data: res,
  });
}
