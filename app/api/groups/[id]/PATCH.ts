import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleZodErrors } from "../../utility";
import { updateGroupSchema } from "./schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function updateGroup(request: NextRequest, groupId: string) {
  if (isNaN(Number(groupId))) {
    return NextResponse.json(
      { message: "Make sure you have inputted the correct ID" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const validation = updateGroupSchema.safeParse(body);
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
        number: validation.data.group_number,
      },
      where: {
        id: parseInt(groupId),
      },
    });

    return NextResponse.json({
      message: "Successfully updated the group",
      updated_event: res,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "There is no event with the specified ID number." },
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
