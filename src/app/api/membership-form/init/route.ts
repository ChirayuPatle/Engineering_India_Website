import { authMiddleware } from "@/utils/auth-middleware";
import { db } from "@/database/db";
import { membershipForm } from "@/database/schema/membership-schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await authMiddleware(req);
    if (!user) return NextResponse.json({ user: null });

    const existing = await db.query.membershipForm.findFirst({
      where: eq(membershipForm.email, user.email),
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        year: user.year,
        branch: user.branch,
      },
      hasSubmitted: !!existing,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
