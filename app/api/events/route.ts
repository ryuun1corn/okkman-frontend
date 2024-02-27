import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import {
  createEventSchema,
  deleteEventSchema,
  updateEventSchema,
} from "./schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { handleZodErrors } from "../utility";

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

export async function DELETE(request: Request) {
  const body = await request.json();
  const validation = deleteEventSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      {
        message: "Validation error",
        errors: handleZodErrors(validation.error.errors),
      },
      {
        status: 400,
      }
    );

  try {
    const res = await prisma.event.delete({
      where: {
        id: validation.data.id,
      },
    });

    return NextResponse.json({
      message: "Successfully deleted the event",
      deleted_event: res,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "There is no event with the specified ID number." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message:
          "An unexpected error occurred on the server. Please contact the developer.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const validation = updateEventSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      {
        message: "Validation error",
        errors: handleZodErrors(validation.error.errors),
      },
      {
        status: 400,
      }
    );

  try {
    const res = await prisma.event.update({
      where: {
        id: validation.data.id,
      },
      data: validation.data.update,
    });

    return NextResponse.json({
      message: "Successfully updated the event",
      updated_event: res,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "There is no event with the specified ID number." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message:
          "An unexpected error occurred on the server. Please contact the developer.",
      },
      { status: 500 }
    );
  }
}
