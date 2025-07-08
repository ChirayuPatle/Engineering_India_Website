// /app/api/user/current/route.ts
import { auth } from "@/lib/auth";
import { db } from "@/database/db";
import { user as userTable } from "@/database/schema/index";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const GET = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userData = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, session.user.id));

    if (!userData || userData.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData[0]);
  } catch (error) {
    console.error("Error fetching current user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
