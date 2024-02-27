import { NextRequest, NextResponse } from "next/server";
import { getAllEvents } from "./GET";
import { createEvent } from "./POST";
import { returnServerError } from "../utility";

export async function GET() {
  try {
    return await getAllEvents();
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}

export async function POST(request: NextRequest) {
  try {
    return await createEvent(request);
  } catch (error) {
    console.log(error);
    return returnServerError();
  }
}
