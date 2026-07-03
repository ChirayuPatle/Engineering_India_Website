import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema/hackathon-schema";
import { auth } from "@/lib/auth";
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
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

    // Fetch all hackathon registrations
    const registrations = await db
      .select()
      .from(hackathon)
      .orderBy(desc(hackathon.createdAt));

    // Parse team members JSON for each registration
    const parsedRegistrations = registrations.map((reg) => ({
      ...reg,
      teamMembers: reg.teamMembers ? JSON.parse(reg.teamMembers) : [],
    }));

    return NextResponse.json(
      {
        registrations: parsedRegistrations,
        total: parsedRegistrations.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch all registrations error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
