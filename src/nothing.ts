// export async function middleware(request: NextRequest) {
//   // return auth(request);
//   return NextResponse.next();
// }

import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

  if (!session) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protect these routes
};
