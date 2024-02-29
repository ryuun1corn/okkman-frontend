import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function removeCommittee(committeeId: string) {
  if (isNaN(Number(committeeId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  try {
    await prisma.committee.delete({
      where: {
        id: parseInt(committeeId),
      },
    });

    return NextResponse.json({
      message: "Successfully removed the committee.",
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "There is no committee with the specified ID number." },
        { status: 404 }
      );
    }

    throw error;
  }
}
