import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { registration, hackathon } from "@/database/schema";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    // Fetch event registrations
    const eventRegistrations = await db
      .select()
      .from(registration)
      .where(eq(registration.userId, userId));

    // Fetch ALL hackathon registrations
    const allHackathonRegs = await db.select().from(hackathon);

    // Filter hackathon by email
    let hackathonRegistrations: any[] = [];
    if (userEmail) {
      hackathonRegistrations = allHackathonRegs.filter((reg) => {
        if (reg.teamLeaderEmail.toLowerCase() === userEmail.toLowerCase()) {
          return true;
        }
        try {
          const members = reg.teamMembers ? JSON.parse(reg.teamMembers) : [];
          if (Array.isArray(members)) {
            return members.some(
              (m) =>
                m.email && m.email.toLowerCase() === userEmail.toLowerCase(),
            );
          }
        } catch (e) {
          console.error("Error parsing team members:", e);
        }
        return false;
      });
    }

    return NextResponse.json({
      debug: {
        userId,
        userEmail,
        eventRegistrationsCount: eventRegistrations.length,
        hackathonRegistrationsCount: hackathonRegistrations.length,
        totalCount: eventRegistrations.length + hackathonRegistrations.length,
        eventRegistrations,
        hackathonRegistrations,
      },
    });
  } catch (err) {
    console.error("Debug API Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
