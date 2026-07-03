import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getSubmissionPeriodOverride,
  setSubmissionPeriodOverride,
} from "@/lib/submission-control";

const SUBMISSION_START = new Date("2025-10-25T00:00:00+05:30");
const SUBMISSION_END = new Date("2025-10-29T23:59:59+05:30");

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin (you might want to add role check here)
    // For now, any authenticated user can access

    const now = new Date();
    const automaticIsActive = now >= SUBMISSION_START && now <= SUBMISSION_END;
    const override = getSubmissionPeriodOverride();

    return NextResponse.json({
      currentTime: now.toISOString(),
      automaticPeriod: {
        start: SUBMISSION_START.toISOString(),
        end: SUBMISSION_END.toISOString(),
        isActive: automaticIsActive,
      },
      override: {
        ...override,
        overrideStart: override.overrideStart?.toISOString() || null,
        overrideEnd: override.overrideEnd?.toISOString() || null,
      },
      effectiveStatus: override.manuallyControlled
        ? override.isActive
        : automaticIsActive,
    });
  } catch (error) {
    console.error("[SUBMISSION_CONTROL_GET_ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to get submission control status" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Add admin role check here
    // if (session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    const body = (await req.json()) as {
      action: "start" | "end" | "reset";
    };

    const { action } = body;

    const now = new Date();

    switch (action) {
      case "start":
        setSubmissionPeriodOverride({
          isActive: true,
          manuallyControlled: true,
          overrideStart: now,
          overrideEnd: null,
        });
        break;

      case "end":
        const currentOverride = getSubmissionPeriodOverride();
        setSubmissionPeriodOverride({
          isActive: false,
          manuallyControlled: true,
          overrideStart: currentOverride.overrideStart,
          overrideEnd: now,
        });
        break;

      case "reset":
        setSubmissionPeriodOverride({
          isActive: false,
          manuallyControlled: false,
          overrideStart: null,
          overrideEnd: null,
        });
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action. Must be 'start', 'end', or 'reset'" },
          { status: 400 },
        );
    }

    const updatedOverride = getSubmissionPeriodOverride();

    return NextResponse.json({
      message: `Submission period ${action === "start" ? "started" : action === "end" ? "ended" : "reset to automatic"} successfully`,
      override: {
        ...updatedOverride,
        overrideStart: updatedOverride.overrideStart?.toISOString() || null,
        overrideEnd: updatedOverride.overrideEnd?.toISOString() || null,
      },
      effectiveStatus: updatedOverride.isActive,
    });
  } catch (error) {
    console.error("[SUBMISSION_CONTROL_POST_ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to update submission control" },
      { status: 500 },
    );
  }
}
