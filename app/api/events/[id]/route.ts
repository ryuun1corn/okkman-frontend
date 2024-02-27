import { NextRequest } from "next/server";
import { deleteEvent } from "./DELETE";
import { returnServerError } from "../../utility";
import { updateEvent } from "./PATCH";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await deleteEvent(params.id);
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await updateEvent(request, params.id);
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}
