import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/database/db";
import { user as userTable } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth");

  if (!isProtected) return NextResponse.next();

  try {
    const session = await auth.api.getSession(req);

    if (!session?.user?.id) {
      if (!pathname.startsWith("/auth")) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth";
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, session.user.id));

    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

    const userRole = user.role;

    // ✅ Redirect logged-in users away from /auth
    if (pathname.startsWith("/auth")) {
      const url = req.nextUrl.clone();
      url.pathname = userRole === "ADMIN" ? "/admin/dashboard" : "/dashboard";
      return NextResponse.redirect(url);
    }

    // ✅ If user is NOT admin and accessing /admin → block
    if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // ✅ If ADMIN is accessing /dashboard → redirect to /admin/dashboard
    if (pathname.startsWith("/dashboard") && userRole === "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (_err) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/admin/:path*"],
};
