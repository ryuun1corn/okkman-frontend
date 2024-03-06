import { NextRequest } from "next/server";
import { returnServerError } from "../../utility";
import { removeSpeaker } from "./DELETE";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await removeSpeaker(params.id);
  } catch (error) {
    return returnServerError(error);
  }
}
