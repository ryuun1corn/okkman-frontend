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
        message: "Validation error",
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
        committee: {
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
      { message: "Success: added a new group!", data: res },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2014"
    ) {
      return NextResponse.json(
        {
          message:
            "The mentor with such an ID is already connected to another group.",
        },
        { status: 404 }
      );
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "There is no mentor with the specified ID number." },
        { status: 404 }
      );
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message: `There already exists a group with the number ${validation.data.number}.`,
        },
        { status: 404 }
      );
    }
    throw error;
  }
}
