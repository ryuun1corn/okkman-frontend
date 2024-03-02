import { NextRequest } from "next/server";
import { returnServerError } from "../utility";
import { getAllMentees } from "./GET";
import { addMentee } from "./POST";

export async function GET() {
  try {
    return await getAllMentees();
  } catch (error) {
    return returnServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    return await addMentee(request);
  } catch (error) {
    return returnServerError(error);
  }
}
