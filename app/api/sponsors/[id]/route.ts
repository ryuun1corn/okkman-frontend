import { NextRequest } from "next/server";
import { returnServerError } from "../../utility";
import { deleteSponsor } from "./DELETE";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await deleteSponsor(params.id);
  } catch (error) {
    return returnServerError(error);
  }
}
