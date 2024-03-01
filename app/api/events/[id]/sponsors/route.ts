import { createSponsorForEvent } from "./POST";
import { returnServerError } from "@/app/api/utility";
import { NextRequest } from "next/server";
import { associateSponsorAndEvent } from "./PUT";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await createSponsorForEvent(request, params.id);
  } catch (error) {
    return returnServerError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return await associateSponsorAndEvent(request, params.id);
  } catch (error) {
    return returnServerError(error);
  }
}
