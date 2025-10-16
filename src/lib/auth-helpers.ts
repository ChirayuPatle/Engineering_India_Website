import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Check if user has admin privileges
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      authorized: false,
      error: "Unauthorized - Please login",
      redirect: "/auth",
    };
  }

  if (session.user.role !== "ADMIN") {
    return {
      authorized: false,
      error: "Forbidden - Admin access required",
      redirect: "/dashboard",
    };
  }

  return {
    authorized: true,
    user: session.user,
  };
}

/**
 * Check if user has moderator or admin privileges
 */
export async function requireModerator() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      authorized: false,
      error: "Unauthorized - Please login",
      redirect: "/auth",
    };
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR") {
    return {
      authorized: false,
      error: "Forbidden - Moderator access required",
      redirect: "/dashboard",
    };
  }

  return {
    authorized: true,
    user: session.user,
  };
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
}

/**
 * API response helper for unauthorized access
 */
export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

/**
 * API response helper for forbidden access
 */
export function forbiddenResponse(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}
