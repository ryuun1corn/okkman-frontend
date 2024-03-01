import { returnServerError } from "../utility";
import { getAllMentees } from "./GET";

export async function GET() {
  try {
    return await getAllMentees();
  } catch (error) {
    return returnServerError(error);
  }
}
