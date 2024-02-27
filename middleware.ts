import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const contentType = request.headers.get("content-type");
  if (contentType !== null && contentType !== "application/json") {
    return NextResponse.json(
      { message: "Content-type must be 'application/json'" },
      { status: 415, headers: { "content-type": "application/json" } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
