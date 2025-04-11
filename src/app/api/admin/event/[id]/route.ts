// src/app/api/events/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { event } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const eventData = await db
      .select()
      .from(event)
      .where(eq(event.id, params.id))
      .limit(1);

    if (!eventData.length) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event: eventData[0] });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  const data = await auth.api.getSession(req);
  const session = data?.session;

  if (!data?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const eventData = Object.fromEntries(formData.entries());

    // Process JSON fields if they exist
    ["registrationFields", "upiIds"].forEach((field) => {
      if (eventData[field] && typeof eventData[field] === "string") {
        try {
          eventData[field] = JSON.parse(eventData[field]);
        } catch (e) {
          console.error(`Failed to parse ${field}:`, e);
        }
      }
    });

    // Update the event
    await db
      .update(event)
      .set({
        ...eventData,
        updatedAt: new Date(),
      })
      .where(eq(event.id, params.id));

    const updatedEvent = await db
      .select()
      .from(event)
      .where(eq(event.id, params.id))
      .limit(1);

    return NextResponse.json({ success: true, event: updatedEvent[0] });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const data = await auth.api.getSession(req);
  const session = data?.session;

  if (!data?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.delete(event).where(eq(event.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 },
    );
  }
}
