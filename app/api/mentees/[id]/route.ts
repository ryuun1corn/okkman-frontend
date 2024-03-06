import { NextRequest } from "next/server";
import { returnServerError } from "../../utility";
import { removeMentee } from "./DELETE";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await removeMentee(params.id);
  } catch (error) {
    return returnServerError(error);
  }
}
