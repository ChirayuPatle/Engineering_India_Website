import { db } from "@/database/db";
import { session, user } from "@/database/schema";
import { User, Role } from "@/types";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function authMiddleware(req: NextRequest): Promise<User | null> {
  try {
    // Get token from Authorization header (Bearer token) or from cookie
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : req.cookies.get("session")?.value;

    // If no token is provided, return null
    if (!token) {
      return null;
    }

    // Find session with the provided token
    const sessions = await db
      .select()
      .from(session)
      .where(eq(session.token, token))
      .limit(1);

    if (sessions.length === 0) {
      return null;
    }

    // Since we checked length above, we can safely access the first element
    const currentSession = sessions[0]!;

    // Check if session has expired
    if (new Date(currentSession.expiresAt) < new Date()) {
      return null;
    }

    // Get the user from the session
    const users = await db
      .select()
      .from(user)
      .where(eq(user.id, currentSession.userId))
      .limit(1);

    if (users.length === 0) {
      return null;
    }

    const foundUser = users[0]!;

    // Convert the database user to the User type
    // This handles any potential type mismatches between DB schema and User type
    const userResult: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      emailVerified: foundUser.emailVerified,
      image: foundUser.image,
      phone: foundUser.phone ?? "",
      collegeName: foundUser.collegeName ?? undefined,
      year: foundUser.year ?? undefined,
      branch: foundUser.branch ?? undefined,
      role: foundUser.role as Role,

      createdAt:
        typeof foundUser.createdAt === "object" &&
        foundUser.createdAt instanceof Date
          ? foundUser.createdAt.getTime()
          : Number(foundUser.createdAt),
      updatedAt:
        typeof foundUser.updatedAt === "object" &&
        foundUser.updatedAt instanceof Date
          ? foundUser.updatedAt.getTime()
          : Number(foundUser.updatedAt),
    };

    return userResult;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return null;
  }
}
