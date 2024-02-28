import { NextRequest } from "next/server";
import { returnServerError } from "../../utility";
import { deleteGroup } from "./DELETE";
import { updateGroup } from "./PATCH";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await deleteGroup(params.id);
  } catch (error) {
    return returnServerError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await updateGroup(request, params.id);
  } catch (error) {
    return returnServerError(error);
  }
}
