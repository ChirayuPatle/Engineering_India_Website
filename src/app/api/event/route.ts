import { db } from "@/database/db";
import { event } from "@/database/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const events = await db.select().from(event);

    console.log("\nEVENTS\n :- ", events);

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const now = new Date();

    const newEvent = await db
      .insert(event)
      .values({
        name: body.name,
        description: body.description,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        timeline: body.timeline ? JSON.stringify(body.timeline) : null,
        prizes: body.prizes ? JSON.stringify(body.prizes) : null,
        faqs: body.faqs ? JSON.stringify(body.faqs) : null,
        organizerContact: body.organizerContact || null,
        coOrganizerContact: body.coOrganizerContact || null,
        discordLink: body.discordLink || null,
        whatsappLink: body.whatsappLink || null,
        bannerImage: body.bannerImage || null,
        gallery: body.gallery ? JSON.stringify(body.gallery) : null,
        details: body.details || null,
        rules: body.rules || null,
        location: body.location || null,
        category: body.category || null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newEvent[0], { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 },
      );
    }

    const now = new Date();

    // Build update object with only defined values
    const updateFields: any = {
      updatedAt: now,
    };

    if (updateData.name) updateFields.name = updateData.name;
    if (updateData.description)
      updateFields.description = updateData.description;
    if (updateData.location) updateFields.location = updateData.location;
    if (updateData.category) updateFields.category = updateData.category;
    if (updateData.details) updateFields.details = updateData.details;
    if (updateData.rules) updateFields.rules = updateData.rules;
    if (updateData.bannerImage)
      updateFields.bannerImage = updateData.bannerImage;
    if (updateData.organizerContact)
      updateFields.organizerContact = updateData.organizerContact;
    if (updateData.coOrganizerContact)
      updateFields.coOrganizerContact = updateData.coOrganizerContact;
    if (updateData.discordLink)
      updateFields.discordLink = updateData.discordLink;
    if (updateData.whatsappLink)
      updateFields.whatsappLink = updateData.whatsappLink;

    if (updateData.timeline)
      updateFields.timeline = JSON.stringify(updateData.timeline);
    if (updateData.prizes)
      updateFields.prizes = JSON.stringify(updateData.prizes);
    if (updateData.faqs) updateFields.faqs = JSON.stringify(updateData.faqs);
    if (updateData.gallery)
      updateFields.gallery = JSON.stringify(updateData.gallery);

    if (updateData.startDate)
      updateFields.startDate = new Date(updateData.startDate);
    if (updateData.endDate) updateFields.endDate = new Date(updateData.endDate);

    const updatedEvent = await db
      .update(event)
      .set(updateFields)
      .where(eq(event.id, id))
      .returning();

    if (!updatedEvent || updatedEvent.length === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEvent[0], { status: 200 });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 },
    );
  }
}
