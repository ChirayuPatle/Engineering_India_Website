import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/events(.*)",
  "/about",
  "/contact",
  "/team"
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {

  const {userId} = await auth();
  const currentUrl = new URL(req.url);
  const isAccessingDashbard = currentUrl.pathname === "/dashboard";
  const isApiRequest = currentUrl.pathname.startsWith("/api");

  // not logged in user trying to access protected routes
  if(!userId){
    if(!isPublicRoute(req) && !isApiRequest){
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if(isApiRequest && !isPublicRoute(req)){
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
  }

  // handle unauthenticated user trying to access proctected routes
  if(!userId && !isPublicRoute(req) && !isApiRequest){
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }  

  // logged in user trying to access admin route
  if(userId && isAdminRoute(req)){
    const session = await auth();
    const role = (session.sessionClaims?.metadata as { role?: string })?.role;
    if(role !== "admin"){
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if(userId){
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const role = user.publicMetadata.role as string | undefined
  
      // admin role redirection
      if(role === "admin" && req.nextUrl.pathname === "/dashboard"){
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
  
      // prevent non admin user to access the admin routes
      if(role !== "admin" && isAdminRoute(req)){
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
  
  
      // Only redirect from auth routes when logged in, allow access to other public routes
      const isAuthRoute = currentUrl.pathname.startsWith('/sign-in') || currentUrl.pathname.startsWith('/sign-up');
      if(isAuthRoute && !isAccessingDashbard){ 
        return NextResponse.redirect(new URL(
          role === "admin" ? "/admin/dashboard" : "/dashboard",
          req.url
        ));
      }
  
  
    if(userId && isPublicRoute(req) && !isAccessingDashbard){
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/error", req.url));
      
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};