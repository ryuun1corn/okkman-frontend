import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function getAllEvents() {
  const res = await prisma.event.findMany();

  return NextResponse.json({
    message: "Successfully get all events",
    data: res,
  });
}
