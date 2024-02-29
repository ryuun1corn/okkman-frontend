import { NextRequest } from "next/server";
import { returnServerError } from "../../utility";
import { removeCommittee } from "./DELETE";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await removeCommittee(params.id);
  } catch (error) {
    return returnServerError(error);
  }
}
