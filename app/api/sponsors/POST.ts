import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { handleZodErrors } from "../utility";
import { addSponsorSchema } from "./schema";

export async function addSponsor(request: NextRequest) {
  const body = await request.json();
  const validation = addSponsorSchema.safeParse(body);
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
    const res = await prisma.sponsor.create({
      data: {
        name: validation.data.name,
        package: validation.data.package,
      },
    });

    return NextResponse.json(
      { message: "Successfully added a new sponsor.", data: res },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "There is already a sponsor with the same name and package." },
        { status: 409 }
      );
    }
  }
}
