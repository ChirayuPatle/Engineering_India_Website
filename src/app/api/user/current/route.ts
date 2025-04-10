// /app/api/user/current/route.ts
import { auth } from "@/lib/auth";
import { db } from "@/database/db";
import { user as userTable } from "@/database/schema/index";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const GET = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userData = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, session.user.id));

  if (!userData || userData.length === 0) {
    return new NextResponse("User not found", { status: 404 });
  }

  return NextResponse.json(userData[0]);
};
