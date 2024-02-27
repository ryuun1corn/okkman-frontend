import { NextRequest, NextResponse } from "next/server";
import { getAllEvents } from "./GET";
import { createEvent } from "./POST";
import { deleteEvent } from "./DELETE";
import { updateEvent } from "./PATCH";
import { returnServerError } from "../utility";

export async function GET() {
  try {
    return await getAllEvents();
  } catch {
    return returnServerError();
  }
}

export async function POST(request: NextRequest) {
  try {
    return await createEvent(request);
  } catch {
    return returnServerError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    return await deleteEvent(request);
  } catch {
    return returnServerError();
  }
}

export async function PATCH(request: NextRequest) {
  try {
    return await updateEvent(request);
  } catch {
    return returnServerError();
  }
}
