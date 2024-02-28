import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { handleZodErrors } from "../../utility";
import { createMentorAndGroupSchema } from "./schema";

export async function createMentorAndGroup(request: NextRequest) {
  const body = await request.json();
  const validation = createMentorAndGroupSchema.safeParse(body);
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

  try {
    const res = await prisma.group.create({
      data: {
        number: validation.data.number,
        mentor: {
          create: {
            name: validation.data.mentor_name,
            committeeType: "BADAN_PENGURUS_HARIAN",
            bphType: "MENTOR",
            pengurusIntiType: null,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Successfully added a new group.", data: res },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2014"
    ) {
      return NextResponse.json(
        {
          error:
            "The mentor with such an ID is already connected to another group.",
        },
        { status: 409 }
      );
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "There is no mentor with the specified ID number." },
        { status: 404 }
      );
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          error: "There already exists a group with the same group number.",
        },
        { status: 409 }
      );
    }

    throw error;
  }
}
