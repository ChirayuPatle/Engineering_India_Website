import { db } from "@/database/db"; // your database connection
import { auth } from "@/lib/auth"; // replace with your auth logic
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.query.registration.findMany({
      where: (reg, { eq }) => eq(reg.userId, session.user.id),
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
