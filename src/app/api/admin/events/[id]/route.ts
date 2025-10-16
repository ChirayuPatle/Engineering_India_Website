import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { event } from "@/database/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-helpers";

// API routes for managing individual events
// GET: Fetch single event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAdmin();

  if (!authResult.authorized) {
    return NextResponse.json(
      { error: authResult.error || "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const events = await db.select().from(event).where(eq(event.id, id));

    if (events.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(events[0]);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 },
    );
  }
}

// PATCH: Update event
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAdmin();

  if (!authResult.authorized) {
    return NextResponse.json(
      { error: authResult.error || "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // Build update data with only valid schema fields
    const updateData: any = {
      updatedAt: new Date(),
    };

    // Only include fields that exist in the schema
    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.bannerImage !== undefined)
      updateData.bannerImage = body.bannerImage;
    if (body.timeline !== undefined) updateData.timeline = body.timeline;
    if (body.details !== undefined) updateData.details = body.details;
    if (body.rules !== undefined) updateData.rules = body.rules;
    if (body.organizerContact !== undefined)
      updateData.organizerContact = body.organizerContact;
    if (body.coOrganizerContact !== undefined)
      updateData.coOrganizerContact = body.coOrganizerContact;
    if (body.discordLink !== undefined)
      updateData.discordLink = body.discordLink;
    if (body.whatsappLink !== undefined)
      updateData.whatsappLink = body.whatsappLink;

    // Map eventType to category (the field that exists in schema)
    if (body.eventType !== undefined) updateData.category = body.eventType;
    if (body.category !== undefined) updateData.category = body.category;

    // Handle date fields - convert to Date objects for Drizzle
    if (body.startDate) {
      updateData.startDate = new Date(body.startDate);
    }
    if (body.endDate) {
      updateData.endDate = new Date(body.endDate);
    }

    // Handle JSON fields
    if (body.prizes !== undefined) {
      updateData.prizes =
        typeof body.prizes === "string"
          ? body.prizes
          : JSON.stringify(body.prizes);
    }
    if (body.faqs !== undefined) {
      updateData.faqs =
        typeof body.faqs === "string" ? body.faqs : JSON.stringify(body.faqs);
    }
    if (body.gallery !== undefined) {
      updateData.gallery =
        typeof body.gallery === "string"
          ? body.gallery
          : JSON.stringify(body.gallery);
    }

    const updatedEvent = await db
      .update(event)
      .set(updateData)
      .where(eq(event.id, id))
      .returning();

    if (updatedEvent.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEvent[0]);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 },
    );
  }
}

// DELETE: Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAdmin();

  if (!authResult.authorized) {
    return NextResponse.json(
      { error: authResult.error || "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const deletedEvent = await db
      .delete(event)
      .where(eq(event.id, id))
      .returning();

    if (deletedEvent.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 },
    );
  }
}
