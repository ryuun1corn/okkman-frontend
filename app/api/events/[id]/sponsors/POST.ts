import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createSponsorForEventSchema } from "./schema";
import { handleZodErrors } from "@/app/api/utility";

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
        package: validation.data.package,
        events: {
          create: [
            {
              sponsored_by: validation.data.name,
              event: {
                connect: {
                  id: parseInt(eventId),
                },
              },
            },
          ],
        },
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
    throw error;
  }
}
