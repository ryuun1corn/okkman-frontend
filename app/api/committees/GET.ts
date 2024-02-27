import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function getAllCommittee() {
  const res = await prisma.committee.findMany();

  return NextResponse.json({
    message: "Successfully get all committees",
    events: res,
  });
}
