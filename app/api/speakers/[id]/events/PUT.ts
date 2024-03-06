import prisma from "@/prisma/client";
import { handleZodErrors } from "@/app/api/utility";
import { NextRequest, NextResponse } from "next/server";
import { associateSpeakerAndEventSchema } from "./schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function associateSpeakerAndEvent(
  request: NextRequest,
  speakerId: string
) {
  const body = await request.json();
  const validation = associateSpeakerAndEventSchema.safeParse(body);
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

  if (isNaN(Number(speakerId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  try {
    const check = await prisma.event.findUnique({
      where: {
        id: validation.data.event_id,
        speakers: {
          some: {
            id: parseInt(speakerId),
          },
        },
      },
    });

    console.log(check);

    if (validation.data.action === "REMOVE" && check === null) {
      return NextResponse.json({
        message: "The speaker is already removed.",
      });
    }

    if (validation.data.action === "ADD" && check !== null) {
      return NextResponse.json({
        message: "The speaker is already added.",
      });
    }

    const res = await prisma.event.update({
      where: {
        id: validation.data.event_id,
      },
      data: {
        speakers:
          validation.data.action === "REMOVE"
            ? {
                disconnect: {
                  id: parseInt(speakerId),
                },
              }
            : {
                connect: {
                  id: parseInt(speakerId),
                },
              },
      },
      include: {
        speakers: true,
      },
    });

    return NextResponse.json({
      message:
        validation.data.action === "REMOVE"
          ? "Successfully removed the speaker from the event"
          : "Successfully added the speaker to the event",
      data: res,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "There is no speaker with the specified ID number." },
        { status: 404 }
      );
    }

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2016"
    ) {
      return NextResponse.json(
        { error: "There is no event with the specified ID number." },
        { status: 404 }
      );
    }

    throw error;
  }
}
