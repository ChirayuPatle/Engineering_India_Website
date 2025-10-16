import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema/hackathon-schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch user's hackathon registration
    const registration = await db
      .select()
      .from(hackathon)
      .where(eq(hackathon.userId, userId))
      .limit(1);

    if (registration.length === 0) {
      return NextResponse.json({ registration: null }, { status: 200 });
    }

    // Parse team members JSON
    const reg = registration[0];
    if (!reg) {
      return NextResponse.json({ registration: null }, { status: 200 });
    }

    const teamMembers = reg.teamMembers ? JSON.parse(reg.teamMembers) : [];

    return NextResponse.json(
      {
        registration: {
          ...reg,
          teamMembers,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
