import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function deleteSponsor(sponsorId: string) {
  if (isNaN(Number(sponsorId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  try {
    await prisma.sponsor.delete({
      where: {
        id: parseInt(sponsorId),
      },
    });

    return NextResponse.json({
      message: "Successfully deleted the sponsor.",
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "There is no sponsor with the specified ID number." },
        { status: 404 }
      );
    }

    throw error;
  }
}
