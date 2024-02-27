import { NextRequest } from "next/server";
import { deleteEvent } from "./DELETE";
import { returnServerError } from "../../utility";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await deleteEvent(params.id);
  } catch {
    return returnServerError();
  }
}
