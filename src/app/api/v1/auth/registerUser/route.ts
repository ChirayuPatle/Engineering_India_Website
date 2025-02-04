import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name") || "Guest";

  return NextResponse.json({
    data: {
      name: name,
      message: `Hello, ${name}!`,
    },
  });
}
