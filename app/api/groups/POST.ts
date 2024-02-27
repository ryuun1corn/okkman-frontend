import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createGroupSchema } from "./schema";
import { handleZodErrors } from "../utility";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createGroup(request: NextRequest) {
  const body = await request.json();
  const validation = createGroupSchema.safeParse(body);
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
          connect: {
            id: validation.data.mentor_id,
            bphType: "MENTOR",
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
