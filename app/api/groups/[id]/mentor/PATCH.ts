import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { updateGroupMentorSchema } from "./schema";
import { handleZodErrors } from "@/app/api/utility";

export async function updateGroupMentor(request: NextRequest, groupId: string) {
  if (isNaN(Number(groupId))) {
    return NextResponse.json(
      { message: "Make sure you have inputted the correct ID" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const validation = updateGroupMentorSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      {
        message: "Validation error",
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
      updated_event: res,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "There is no group with the specified ID number." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message:
          "An unexpected error occurred on the server. Please contact the developer.",
      },
      { status: 500 }
    );
  }
}
