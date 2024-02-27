import { NextRequest } from "next/server";
import { returnServerError } from "../../utility";
import { createMentorAndGroup } from "./POST";

export async function POST(request: NextRequest) {
  try {
    return await createMentorAndGroup(request);
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}
