import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

// TEMPORARY DEBUG ENDPOINT - Remove after fixing
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "Email not found in session" },
        { status: 400 },
      );
    }

    // Get user's registration
    const allRegistrations = await db.select().from(hackathon);
    const userRegistration = allRegistrations.find(
      (reg) => reg.teamLeaderEmail.toLowerCase() === userEmail.toLowerCase(),
    );

    if (!userRegistration) {
      return NextResponse.json(
        { error: "You are not a team leader" },
        { status: 403 },
      );
    }

    // Return debug info
    return NextResponse.json({
      teamName: userRegistration.teamName,
      round1PptUrl: userRegistration.round1PptUrl,
      round1PptUrlType: typeof userRegistration.round1PptUrl,
      round1PptUrlLength: userRegistration.round1PptUrl?.length || 0,
      round1SubmittedAt: userRegistration.round1SubmittedAt,
      round1Status: userRegistration.round1Status,
      isTruthy: !!userRegistration.round1PptUrl,
      isTruthyAfterTrim: !!userRegistration.round1PptUrl?.trim(),
    });
  } catch (error) {
    console.error("[DEBUG_ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to fetch debug data" },
      { status: 500 },
    );
  }
}

// POST to reset/clear the submission
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "Email not found in session" },
        { status: 400 },
      );
    }

    // Get user's registration
    const allRegistrations = await db.select().from(hackathon);
    const userRegistration = allRegistrations.find(
      (reg) => reg.teamLeaderEmail.toLowerCase() === userEmail.toLowerCase(),
    );

    if (!userRegistration) {
      return NextResponse.json(
        { error: "You are not a team leader" },
        { status: 403 },
      );
    }

    // Clear the Round 1 submission data
    await db
      .update(hackathon)
      .set({
        round1PptUrl: null,
        round1SubmittedAt: null,
        round1Status: "not_submitted",
        updatedAt: new Date(),
      })
      .where(eq(hackathon.id, userRegistration.id));

    return NextResponse.json({
      message: "Round 1 submission data cleared successfully!",
      teamName: userRegistration.teamName,
    });
  } catch (error) {
    console.error("[RESET_ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to reset submission data" },
      { status: 500 },
    );
  }
}
