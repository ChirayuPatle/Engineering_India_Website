import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema/hackathon-schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    // Check authentication and admin role
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!status || !["pending", "verified", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: pending, verified, or rejected" },
        { status: 400 },
      );
    }

    // Update registration status
    const now = new Date();
    await db
      .update(hackathon)
      .set({
        status,
        updatedAt: now,
      })
      .where(eq(hackathon.id, id));

    // Fetch updated registration
    const updated = await db
      .select()
      .from(hackathon)
      .where(eq(hackathon.id, id))
      .limit(1);

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    const registration = updated[0];
    const teamMembers = registration?.teamMembers
      ? JSON.parse(registration.teamMembers)
      : [];

    return NextResponse.json(
      {
        success: true,
        message: `Registration ${status} successfully`,
        registration: {
          ...registration,
          teamMembers,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update registration status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
