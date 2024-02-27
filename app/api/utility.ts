import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

export function handleZodErrors(errors: ZodIssue[]): string[] {
  let allErrors: string[] = [];
  errors.forEach(({ path, message }) => {
    allErrors.push(`${path[0]}: ${message}`);
  });

  return allErrors;
}

export function returnServerError() {
  return NextResponse.json(
    {
      message:
        "Something went wrong. Please contact the developer or check your request data",
    },
    { status: 500 }
  );
}
