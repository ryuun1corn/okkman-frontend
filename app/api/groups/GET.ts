import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function getGroups() {
  const res = await prisma.group.findMany({
    include: {
      committee: true,
    },
  });

  return NextResponse.json({
    message: "Successfully get all groups",
    data: res,
  });
}
