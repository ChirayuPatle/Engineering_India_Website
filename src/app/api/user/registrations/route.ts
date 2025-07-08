import { db } from "@/database/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await db.query.registration.findMany({
      where: (reg, { eq }) => eq(reg.userId, session.user.id),
    });

    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 },
    );
  }
}
