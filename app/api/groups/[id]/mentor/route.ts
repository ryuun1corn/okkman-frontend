import { NextRequest } from "next/server";
import { updateGroupMentor } from "./PATCH";
import { returnServerError } from "@/app/api/utility";
import { changeMentor } from "./PUT";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await updateGroupMentor(request, params.id);
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await changeMentor(request, params.id);
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}
