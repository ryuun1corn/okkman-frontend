import { NextRequest } from "next/server";
import { returnServerError } from "../../utility";
import { deleteGroup } from "./DELETE";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await deleteGroup(params.id);
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}
