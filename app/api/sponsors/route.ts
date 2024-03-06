import { NextRequest } from "next/server";
import { returnServerError } from "../utility";
import { getAllSponsors } from "./GET";
import { addSponsor } from "./POST";

export async function GET() {
  try {
    return await getAllSponsors();
  } catch (error) {
    return returnServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    return await addSponsor(request);
  } catch (error) {
    return returnServerError(error);
  }
}
