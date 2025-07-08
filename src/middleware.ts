import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

interface SessionData {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
  user: {
    id: string;
    role: string;
    [key: string]: any;
  };
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/profile") &&
    !pathname.startsWith("/auth")
  ) {
    console.log("Skipping non-protected route");
    return NextResponse.next();
  }

  try {
    const data = (await auth.api.getSession(req)) as unknown as SessionData;

    const isLoggedIn = !!data?.session;

    if (pathname.startsWith("/auth")) {
      if (isLoggedIn) {
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
      if (!isLoggedIn) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth";
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/auth/:path*"],
};
