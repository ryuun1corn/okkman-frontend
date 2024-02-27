import { NextRequest } from "next/server";
import { createGroup } from "./POST";
import { returnServerError } from "../utility";
import { getGroups } from "./GET";

export async function GET() {
  try {
    return await getGroups();
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}

export async function POST(request: NextRequest) {
  try {
    return await createGroup(request);
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}
