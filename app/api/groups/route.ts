import { NextRequest } from "next/server";
import { createGroup } from "./POST";
import { returnServerError } from "../utility";
import { getGroups } from "./GET";

export async function GET() {
  try {
    return await getGroups();
  } catch (error) {
    return returnServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    return await createGroup(request);
  } catch (error) {
    return returnServerError(error);
  }
}
