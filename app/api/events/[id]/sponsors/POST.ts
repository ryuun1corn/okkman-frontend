import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createSponsorForEventSchema } from "./schema";
import { handleZodErrors } from "@/app/api/utility";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createSponsorForEvent(
  request: NextRequest,
  eventId: string
) {
  const body = await request.json();
  const validation = createSponsorForEventSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "There was something wrong with the data sent.",
        errors: handleZodErrors(validation.error.errors),
      },
      {
        status: 400,
      }
    );
  }

  if (isNaN(Number(eventId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  try {
    const res = await prisma.sponsor.create({
      data: {
        name: validation.data.name,
        package: validation.data.package,
        events: {
          connect: [
            {
              id: parseInt(eventId),
            },
          ],
        },
      },
      include: {
        events: true,
      },
    });

    return NextResponse.json(
      {
        message:
          "Successfully created a new sponsor and connected it to an event.",
        data: res,
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          error: "There is already a sponsor with the same name and package.",
        },
        { status: 409 }
      );
    }

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
