import prisma from "@/prisma/client";
import { Event } from "@prisma/client";
import { NextResponse } from "next/server";
import { createEventSchema } from "./interface";

export async function GET() {
  const res = await prisma.event.findMany();

  return NextResponse.json({
    message: "Successfully get all events",
    events: res,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = createEventSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const res = await prisma.event.create({
    data: {
      name: validation.data.name,
      start_date: new Date(validation.data.start_date),
      end_date: new Date(validation.data.end_date),
      location: validation.data.location,
      description: validation.data.description,
    },
  });

  return NextResponse.json({ message: "Success!", data: res }, { status: 201 });
}
