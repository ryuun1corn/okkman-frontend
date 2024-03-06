import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function removeSpeaker(speakerId: string) {
  console.log("testing");
  if (isNaN(Number(speakerId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  try {
    await prisma.speaker.delete({
      where: {
        id: parseInt(speakerId),
      },
    });

    return NextResponse.json({
      message: "Successfully deleted the speaker.",
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

    throw error;
  }
}
