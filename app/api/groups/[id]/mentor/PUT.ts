import prisma from "@/prisma/client";
import { handleZodErrors } from "@/app/api/utility";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { changeMentorSchema } from "./schema";

export async function changeMentor(request: NextRequest, groupId: string) {
  if (isNaN(Number(groupId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  const body = await request.json();
  const validation = changeMentorSchema.safeParse(body);
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
          connect: {
            id: validation.data.mentor_id,
            bph_type: "MENTOR",
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
      message: "Successfully changed the mentor of the group.",
      data: res,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Either the group or the mentor was not found." },
        { status: 404 }
      );
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2014"
    ) {
      return NextResponse.json(
        {
          error:
            "The mentor that was specified was already a mentor of another group.",
        },
        { status: 409 }
      );
    }

    throw error;
  }
}
