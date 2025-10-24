import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { isSubmissionPeriodActive } from "@/lib/submission-control";

const SUBMISSION_START = new Date("2025-10-25T00:00:00+05:30"); // Oct 25, 2025 IST
const SUBMISSION_END = new Date("2025-10-29T23:59:59+05:30"); // Oct 29, 2025 IST

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

    // Hard constraint: Enforce minimum start date (Oct 25, 2025)
    const now = new Date();
    if (now < SUBMISSION_START) {
      return NextResponse.json(
        {
          error: "Submission period has not started yet",
          startDate: SUBMISSION_START.toISOString(),
          message:
            "Round 1 PPT submissions will begin on October 25, 2025 at 12:00 AM IST",
        },
        { status: 400 },
      );
    }

    // Check if submission period is active (respects manual override for END date only)
    const isActive = isSubmissionPeriodActive(SUBMISSION_START, SUBMISSION_END);

    if (!isActive) {
      return NextResponse.json(
        {
          error: "Submission period is not active",
          automaticPeriod: {
            start: SUBMISSION_START.toISOString(),
            end: SUBMISSION_END.toISOString(),
          },
        },
        { status: 400 },
      );
    }

    const body = (await req.json()) as { pptUrl: string };
    const { pptUrl } = body;

    if (!pptUrl) {
      return NextResponse.json(
        { error: "PPT URL is required" },
        { status: 400 },
      );
    }

    // Fetch ALL hackathon registrations to find user's team
    const allRegistrations = await db.select().from(hackathon);

    // Find registration where user is team LEADER (not member)
    const userRegistration = allRegistrations.find(
      (reg) => reg.teamLeaderEmail.toLowerCase() === userEmail.toLowerCase(),
    );

    if (!userRegistration) {
      return NextResponse.json(
        {
          error:
            "Only team leaders can submit PPT. You are either not registered or not a team leader.",
        },
        { status: 403 },
      );
    }

    // Check if already submitted
    if (userRegistration.round1PptUrl?.trim()) {
      return NextResponse.json(
        {
          error: "Your team has already submitted the Round 1 PPT",
          submittedAt: userRegistration.round1SubmittedAt,
          pptUrl: userRegistration.round1PptUrl,
        },
        { status: 400 },
      );
    }

    // Check if payment is verified
    if (userRegistration.status !== "verified") {
      return NextResponse.json(
        {
          error: "Your payment must be verified before submitting Round 1 PPT",
          currentStatus: userRegistration.status,
        },
        { status: 403 },
      );
    }

    // Update hackathon record with Round 1 submission
    await db
      .update(hackathon)
      .set({
        round1PptUrl: pptUrl,
        round1SubmittedAt: now,
        round1Status: "submitted",
        updatedAt: now,
      })
      .where(eq(hackathon.id, userRegistration.id));

    return NextResponse.json(
      {
        message: "Round 1 PPT submitted successfully!",
        teamName: userRegistration.teamName,
        submittedAt: now,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[ROUND1_SUBMIT_ERROR]:", error);
    return NextResponse.json(
      {
        error: "Failed to submit Round 1 PPT",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// GET endpoint to check submission status
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

    return NextResponse.json({
      teamName: userRegistration.teamName,
      paymentStatus: userRegistration.status,
      hasSubmitted: !!userRegistration.round1PptUrl?.trim(),
      pptUrl: userRegistration.round1PptUrl,
      submittedAt: userRegistration.round1SubmittedAt,
      round1Status: userRegistration.round1Status,
      submissionPeriod: {
        start: SUBMISSION_START.toISOString(),
        end: SUBMISSION_END.toISOString(),
        isActive: isSubmissionPeriodActive(SUBMISSION_START, SUBMISSION_END),
      },
    });
  } catch (error) {
    console.error("[ROUND1_STATUS_ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission status" },
      { status: 500 },
    );
  }
}
