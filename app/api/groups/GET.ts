import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function getGroups() {
  const res = await prisma.group.findMany({
    include: {
      mentor: true,
      mentees: true,
    },
  });

  return NextResponse.json({
    message: "Successfully get all groups.",
    data: res,
  });
}
