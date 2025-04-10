// import { auth } from "@/lib/auth";
// import { toNextJsHandler } from "better-auth/next-js";

import { NextResponse } from "next/server";

// export const { GET, POST } = toNextJsHandler(auth);
export async function GET(request: Request) {
  return NextResponse.json({ data: "hello" }, { status: 200 });
}
