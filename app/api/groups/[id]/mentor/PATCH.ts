import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { updateGroupMentorSchema } from "./schema";
import { handleZodErrors } from "@/app/api/utility";

export async function updateGroupMentor(request: NextRequest, groupId: string) {
  if (isNaN(Number(groupId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  const body = await request.json();
  const validation = updateGroupMentorSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      {
        error: "There was something wrong with the data sent.",
        errors: handleZodErrors(validation.error.errors),
      },
      {
        status: 400,
      }
    );

  try {
    const res = await prisma.group.update({
      data: {
        mentor: {
          update: {
            name: validation.data.name,
          },
        },
      },
      where: {
        id: parseInt(groupId),
      },
      include: {
        mentor: true,
      },
    });

    return NextResponse.json({
      message: "Successfully updated the mentor of the group",
      data: res,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "There is no group with the specified ID number." },
        { status: 404 }
      );
    }

    throw error;
  }
}
