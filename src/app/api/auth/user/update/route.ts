import { db } from "@/database/db";
import { user } from "@/database/schema/auth-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  collegeName: z.string().optional(),
  year: z.string().optional(),
  branch: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedBody = updateUserSchema.parse(body);

    if (Object.keys(validatedBody).length === 0) {
      return NextResponse.json(
        { message: "Request body cannot be empty" },
        { status: 400 },
      );
    }

    await db.update(user).set(validatedBody).where(eq(user.id, userId));

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request body", errors: error.errors },
        { status: 400 },
      );
    }
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
