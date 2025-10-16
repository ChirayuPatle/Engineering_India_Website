import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-helpers";

// PATCH: Update user role
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAdmin();

  if (!authResult.authorized) {
    return NextResponse.json(
      { error: authResult.error || "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { role } = body;

    // Validate role
    if (!["USER", "MODERATOR", "ADMIN"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be: USER, MODERATOR, or ADMIN" },
        { status: 400 },
      );
    }

    // Prevent admin from changing their own role
    if (id === authResult.user?.id) {
      return NextResponse.json(
        { error: "You cannot change your own role" },
        { status: 403 },
      );
    }

    const updatedUser = await db
      .update(user)
      .set({ role })
      .where(eq(user.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 },
    );
  }
}
