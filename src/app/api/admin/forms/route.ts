import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { eventForm } from "@/database/schema";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { name, description, eventId, fields } = body;

    if (!name || !fields || !Array.isArray(fields)) {
      return NextResponse.json(
        { error: "Name and fields are required" },
        { status: 400 },
      );
    }

    const [newForm] = await db
      .insert(eventForm)
      .values({
        eventId: eventId || null,
        title: name,
        description: description || null,
        formSchema: fields,
      })
      .returning();

    return NextResponse.json({
      success: true,
      form: newForm,
    });
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 },
      );
    }

    const forms = await db.select().from(eventForm);

    return NextResponse.json({
      success: true,
      forms,
    });
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
