import { NextRequest } from "next/server";
import { returnServerError } from "../utility";
import { getAllSpeakers } from "./GET";
import { addSpeaker } from "./POST";

export async function GET() {
  try {
    return await getAllSpeakers();
  } catch (error) {
    return returnServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    return await addSpeaker(request);
  } catch (error) {
    return returnServerError(error);
  }
}
