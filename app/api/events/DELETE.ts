import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { handleZodErrors } from "../utility";
import { deleteEventSchema } from "./schema";

export async function deleteEvent(request: NextRequest) {
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
