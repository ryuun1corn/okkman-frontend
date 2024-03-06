import { PENGURUS_INTI_TYPE, BADAN_PENGURUS_HARIAN_TYPE } from "@prisma/client";
import { getCommitteeTypes } from "./GET";
import { returnServerError } from "../../utility";
import { bphTypes, pengurusIntiTypes } from "./data";

export async function GET() {
  try {
    return getCommitteeTypes(bphTypes, pengurusIntiTypes);
  } catch (error) {
    return returnServerError(error);
  }
}
