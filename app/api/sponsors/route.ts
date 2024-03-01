import { returnServerError } from "../utility";
import { getAllSponsors } from "./GET";

export async function GET() {
  try {
    return await getAllSponsors();
  } catch (error) {
    return returnServerError(error);
  }
}
