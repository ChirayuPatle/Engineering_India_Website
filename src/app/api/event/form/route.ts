import { db } from "@/database/db";
import { eventForm } from "@/database/schema/form-builder-schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const now = new Date();

    const newForm = await db
      .insert(eventForm)
      .values({
        eventId: body.eventId,
        formSchema: body.formSchema,
        title: body.title || "Event Registration",
        description: body.description || "",
        successMessage:
          body.successMessage ||
          "Thank you for registering! We'll contact you soon.",
        formImage: body.formImage || null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newForm[0], { status: 201 });
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      const forms = await db.select().from(eventForm);
      return NextResponse.json(forms);
    }

    const form = await db
      .select()
      .from(eventForm)
      .where(eq(eventForm.eventId, eventId));

    if (!form || form.length === 0) {
      return NextResponse.json(
        { message: "Form not found for this event" },
        { status: 404 },
      );
    }

    return NextResponse.json(form[0]);
  } catch (error) {
    console.error("Error fetching form:", error);
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
        { message: "Form ID is required" },
        { status: 400 },
      );
    }

    const now = new Date();

    const updatedForm = await db
      .update(eventForm)
      .set({
        ...updateData,
        updatedAt: now,
      })
      .where(eq(eventForm.id, id))
      .returning();

    if (!updatedForm || updatedForm.length === 0) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(updatedForm[0], { status: 200 });
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 },
    );
  }
}
