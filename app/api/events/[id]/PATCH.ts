import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { handleZodErrors } from "../../utility";
import { updateEventSchema } from "./schema";

export async function updateEvent(request: NextRequest, committeeId: string) {
  if (isNaN(Number(committeeId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  const body = await request.json();
  const validation = updateEventSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      {
        error: "There was something wrong with the data sent.",
        errors: handleZodErrors(validation.error.errors),
      },
      {
        status: 400,
      }
    );

  try {
    const res = await prisma.event.update({
      where: {
        id: parseInt(committeeId),
      },
      data: validation.data,
    });

    return NextResponse.json({
      message: "Successfully updated the event.",
      data: res,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "There is no event with the specified ID number." },
        { status: 404 }
      );
    }

    throw error;
  }
}
