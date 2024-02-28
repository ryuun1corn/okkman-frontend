import { NextRequest } from "next/server";
import { getAllEvents } from "./GET";
import { createEvent } from "./POST";
import { returnServerError } from "../utility";

export async function GET() {
  try {
    return await getAllEvents();
  } catch (error) {
    return returnServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    return await createEvent(request);
  } catch (error) {
    return returnServerError(error);
  }
}
