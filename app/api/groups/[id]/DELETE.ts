import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function deleteGroup(groupId: string) {
  if (isNaN(Number(groupId))) {
    return NextResponse.json(
      { message: "Make sure you have inputted the correct ID" },
      { status: 400 }
    );
  }

  try {
    const res = await prisma.group.delete({
      where: {
        id: parseInt(groupId),
      },
    });

    return NextResponse.json({
      message: "Successfully deleted the group",
      deleted_event: res,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "There is no group with the specified ID number." },
        { status: 404 }
      );
    }
  }
}
