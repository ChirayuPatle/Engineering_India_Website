import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema/hackathon-schema";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "No email found in session" },
        { status: 400 },
      );
    }

    console.log("[MY-REGISTRATION] Checking for email:", userEmail);

    // Fetch ALL hackathon registrations and filter by email
    // This allows team members to see their registration too
    const allRegistrations = await db.select().from(hackathon);

    console.log(
      "[MY-REGISTRATION] Total registrations:",
      allRegistrations.length,
    );

    // Find registration where user is team leader OR team member
    const userRegistration = allRegistrations.find((reg) => {
      // Check if user is team leader
      if (reg.teamLeaderEmail.toLowerCase() === userEmail.toLowerCase()) {
        console.log("[MY-REGISTRATION] Found as team leader");
        return true;
      }

      // Check if user is in team members array
      try {
        const members = reg.teamMembers ? JSON.parse(reg.teamMembers) : [];
        if (Array.isArray(members)) {
          const isMember = members.some(
            (m) => m.email && m.email.toLowerCase() === userEmail.toLowerCase(),
          );
          if (isMember) {
            console.log("[MY-REGISTRATION] Found as team member");
          }
          return isMember;
        }
      } catch (e) {
        console.error("[MY-REGISTRATION] Error parsing team members:", e);
      }

      return false;
    });

    if (!userRegistration) {
      console.log("[MY-REGISTRATION] No registration found for this user");
      return NextResponse.json({ registration: null }, { status: 200 });
    }

    // Parse team members JSON
    let teamMembers = [];
    try {
      teamMembers = userRegistration.teamMembers
        ? JSON.parse(userRegistration.teamMembers)
        : [];
    } catch (e) {
      console.error("[MY-REGISTRATION] Error parsing team members:", e);
      teamMembers = [];
    }

    console.log("[MY-REGISTRATION] Registration found!");
    return NextResponse.json(
      {
        registration: {
          ...userRegistration,
          teamMembers,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[MY-REGISTRATION] Fetch registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
