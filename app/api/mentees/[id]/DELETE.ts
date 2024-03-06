import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function removeMentee(menteeId: string) {
  if (isNaN(Number(menteeId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  try {
    await prisma.mentee.delete({
      where: {
        id: parseInt(menteeId),
      },
    });

    return NextResponse.json({ message: "Successfully removed the mentee." });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "There is no mentee with the specified ID number." },
        { status: 404 }
      );
    }

    throw error;
  }
}
