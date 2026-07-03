import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const userEmail = session.user.email;

    // Get all hackathon registrations
    const allRegistrations = await db.select().from(hackathon);

    // Find registration for this user
    const userRegistration = allRegistrations.find(
      (reg) =>
        reg.teamLeaderEmail.toLowerCase().trim() ===
        userEmail?.toLowerCase().trim(),
    );

    return NextResponse.json({
      session: {
        userId: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
      hackathon: {
        found: !!userRegistration,
        registration: userRegistration
          ? {
              teamName: userRegistration.teamName,
              teamLeaderEmail: userRegistration.teamLeaderEmail,
              status: userRegistration.status,
              hasSubmittedRound1: !!userRegistration.round1PptUrl?.trim(),
            }
          : null,
      },
      allTeamLeaders: allRegistrations.map((r) => ({
        teamName: r.teamName,
        email: r.teamLeaderEmail,
        status: r.status,
      })),
      emailComparison: {
        sessionEmail: userEmail,
        sessionEmailLower: userEmail?.toLowerCase().trim(),
        matchingTeam:
          allRegistrations.find(
            (reg) =>
              reg.teamLeaderEmail.toLowerCase().trim() ===
              userEmail?.toLowerCase().trim(),
          )?.teamName || "NONE",
      },
    });
  } catch (error) {
    console.error("[DEBUG_SESSION_ERROR]:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch debug info",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
