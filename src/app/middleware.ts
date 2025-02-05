import { userService } from "@/libs/appwrite/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const protectedPaths = ["/dashboard", "/event/register"];
  const { pathname } = request.nextUrl;

  // Check if user is accessing a protected path
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // Get session from cookies (modify based on your setup)
    const user = userService.getCurrentUserDetail();
    user.then((res) => {
      console.log(res);
    });

    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configure middleware to apply to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/event/register/:path*"],
};
