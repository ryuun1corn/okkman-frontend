import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function deleteGroup(groupId: string) {
  if (isNaN(Number(groupId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  try {
    await prisma.group.delete({
      where: {
        id: parseInt(groupId),
      },
    });

    return NextResponse.json({
      message: "Successfully deleted the group.",
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "There is no group with the specified ID number." },
        { status: 404 }
      );
    }

    throw error;
  }
}
