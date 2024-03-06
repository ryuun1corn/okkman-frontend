import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { addMenteeSchema } from "./schema";
import { handleZodErrors } from "../utility";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function addMentee(request: NextRequest) {
  const body = await request.json();
  const validation = addMenteeSchema.safeParse(body);
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
    const res = await prisma.mentee.create({
      data: {
        name: validation.data.name,
        faculty: validation.data.faculty,
        major: validation.data.major,
        entrance_year: validation.data.entrance_year,
        entrance_method: validation.data.entrance_method,
        group: {
          connect: {
            number: validation.data.group_number,
          },
        },
      },
      include: {
        group: true,
      },
    });

    return NextResponse.json(
      { message: "Successfully added a new mentee.", data: res },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "There is no group with the specified ID number." },
        { status: 404 }
      );
    }

    throw error;
  }
}
