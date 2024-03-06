import { returnServerError } from "@/app/api/utility";
import { NextRequest } from "next/server";
import { associateSpeakerAndEvent } from "./PUT";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await associateSpeakerAndEvent(request, params.id);
  } catch (error) {
    return returnServerError(error);
  }
}
