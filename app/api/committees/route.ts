import { NextRequest } from "next/server";

import { getAllCommittee } from "./GET";
import { hireNewCommittee } from "./POST";
import { returnServerError } from "../utility";

export async function GET() {
  try {
    return await getAllCommittee();
  } catch {
    returnServerError();
  }
}

export async function POST(request: NextRequest) {
  try {
    return await hireNewCommittee(request);
  } catch {
    returnServerError();
  }
}
