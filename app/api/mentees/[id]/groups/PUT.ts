import prisma from "@/prisma/client";
import { moveMenteeToGroupSchema } from "./schema";
import { handleZodErrors } from "@/app/api/utility";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function moveMenteeToGroup(
  request: NextRequest,
  menteeId: string
) {
  const body = await request.json();
  const validation = moveMenteeToGroupSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "There was something wrong with the data sent.",
        errors: handleZodErrors(validation.error.errors),
      },
      {
        status: 400,
      }
    );
  }

  if (isNaN(Number(menteeId))) {
    return NextResponse.json(
      { error: "Make sure you have inputted the correct ID." },
      { status: 400 }
    );
  }

  try {
    const check = await prisma.group.findUnique({
      where: {
        id: validation.data.group_id,
        mentees: {
          some: {
            id: parseInt(menteeId),
          },
        },
      },
    });

    if (check !== null) {
      return NextResponse.json({
        message: "The mentee is already in the group.",
      });
    }

    const res = await prisma.mentee.update({
      data: {
        group: {
          connect: {
            id: validation.data.group_id,
          },
        },
      },
      where: {
        id: parseInt(menteeId),
      },
    });

    return NextResponse.json({
      message: "Successfully moved the mentee to the group",
      data: res,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          error: "Either the mentee or the group with such IDs don't exist.",
        },
        { status: 404 }
      );
    }

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2016"
    ) {
      return NextResponse.json(
        { error: "There is no event with the specified ID number." },
        { status: 404 }
      );
    }

    throw error;
  }
}
