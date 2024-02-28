import prisma from "@/prisma/client";
import { handleZodErrors } from "@/app/api/utility";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { changeMentorSchema } from "./schema";

export async function changeMentor(request: NextRequest, groupId: string) {
  if (isNaN(Number(groupId))) {
    return NextResponse.json(
      { message: "Make sure you have inputted the correct ID" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const validation = changeMentorSchema.safeParse(body);
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
          connect: {
            id: validation.data.mentor_id,
            bphType: "MENTOR",
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

    // const res = await prisma.committee.update({
    //   data: {
    //     group: {
    //       connect: {
    //         id: parseInt(groupId),
    //       },
    //     },
    //   },
    //   where: {
    //     id: validation.data.mentor_id,
    //   },
    //   include: {
    //     group: true,
    //   },
    // });

    return NextResponse.json({
      message: "Successfully changed the mentor of the group",
      updated_event: res,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025")
        return NextResponse.json(
          { message: "Either the group or the mentor was not found." },
          { status: 404 }
        );
      if (error.code === "P2014")
        return NextResponse.json(
          {
            message:
              "The mentor that was specified is already a mentor of another group.",
          },
          { status: 409 }
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
