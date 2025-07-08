import { db } from "@/database/db";
import { membershipForm } from "@/database/schema/membership-schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { authSchema } from "@/database/schema/index";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch full user details from DB using session user id
    const fullUser = await db.query.user.findFirst({
      where: eq(authSchema.user.id, session.user.id),
    });

    if (!fullUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check membership submission status
    const existing = await db.query.membershipForm.findFirst({
      where: eq(membershipForm.userId, fullUser.id),
    });

    return NextResponse.json({
      user: {
        id: fullUser.id,
        name: fullUser.name,
        email: fullUser.email,
        year: fullUser.year,
        branch: fullUser.branch,
        phone: fullUser.phone,
        collegeName: fullUser.collegeName,
      },
      hasSubmitted: !!existing,
    });
  } catch (error) {
    console.error("Error fetching user status:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
