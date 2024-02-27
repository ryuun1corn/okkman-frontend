import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createEventSchema } from "./schema";
import { handleZodErrors } from "../utility";

export async function createEvent(request: NextRequest) {
  const body = await request.json();
  const validation = createEventSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        message: "Validation error",
        errors: handleZodErrors(validation.error.errors),
      },
      {
        status: 400,
      }
    );
  }

  const res = await prisma.event.create({
    data: {
      name: validation.data.name,
      start_date: new Date(validation.data.start_date),
      end_date: new Date(validation.data.end_date),
      location: validation.data.location,
      description: validation.data.description,
    },
  });

  return NextResponse.json(
    { message: "Success: added a new event!", data: res },
    { status: 201 }
  );
}
