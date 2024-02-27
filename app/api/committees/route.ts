import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

import { addCommitteeSchema } from "./interface";
import { handleZodErrors } from "../utility";

export async function GET() {
  const res = await prisma.committee.findMany();

  return NextResponse.json({
    message: "Successfully get all committees",
    events: res,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = addCommitteeSchema.safeParse(body);
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
