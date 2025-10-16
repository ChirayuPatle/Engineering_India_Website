import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { registration } from "@/database/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-helpers";

// GET: Fetch single registration by ID
export async function GET(
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
    const registrations = await db
      .select()
      .from(registration)
      .where(eq(registration.id, id));

    if (registrations.length === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(registrations[0]);
  } catch (error) {
    console.error("Error fetching registration:", error);
    return NextResponse.json(
      { error: "Failed to fetch registration" },
      { status: 500 },
    );
  }
}

// PATCH: Update registration status (approve/reject)
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
    const { status } = body;

    // Validate status
    if (!["pending", "verified", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: pending, verified, or rejected" },
        { status: 400 },
      );
    }

    const updatedRegistration = await db
      .update(registration)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(registration.id, id))
      .returning();

    if (updatedRegistration.length === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedRegistration[0]);
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Failed to update registration" },
      { status: 500 },
    );
  }
}

// DELETE: Delete registration
export async function DELETE(
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
    const deletedRegistration = await db
      .delete(registration)
      .where(eq(registration.id, id))
      .returning();

    if (deletedRegistration.length === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { error: "Failed to delete registration" },
      { status: 500 },
    );
  }
}
