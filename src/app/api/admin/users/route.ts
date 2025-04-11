import { db } from "@/database/db";
import { user as userTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET: Fetch all users
export async function GET() {
  try {
    const users = await db.select().from(userTable);
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// PATCH: Update user role
export async function PATCH(req: Request) {
  try {
    const { userId, role } = await req.json();
    await db.update(userTable).set({ role }).where(eq(userTable.id, userId));
    return NextResponse.json({ message: "Role updated" });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to update role" },
      { status: 500 },
    );
  }
}
