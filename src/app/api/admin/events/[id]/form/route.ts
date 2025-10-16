import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { eventForm } from "@/database/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-helpers";

// GET: Fetch form for an event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: eventId } = await params;

    const forms = await db
      .select()
      .from(eventForm)
      .where(eq(eventForm.eventId, eventId));

    if (forms.length === 0) {
      return NextResponse.json(
        { error: "No form found for this event" },
        { status: 404 },
      );
    }

    return NextResponse.json(forms[0]);
  } catch (error) {
    console.error("Error fetching event form:", error);
    return NextResponse.json(
      { error: "Failed to fetch event form" },
      { status: 500 },
    );
  }
}

// POST: Create form for an event
export async function POST(
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
    const { id: eventId } = await params;
    const body = await request.json();

    // Check if form already exists for this event
    const existingForms = await db
      .select()
      .from(eventForm)
      .where(eq(eventForm.eventId, eventId));

    if (existingForms.length > 0) {
      return NextResponse.json(
        { error: "Form already exists for this event. Use PATCH to update." },
        { status: 400 },
      );
    }

    // Prepare values - only include formImage if the column exists
    const values: any = {
      eventId,
      formSchema: body.formSchema || [],
      title: body.title || "Event Registration Form",
      description: body.description || "",
      successMessage: body.successMessage || "Thank you for registering!",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Try to include formImage if provided
    if (body.formImage !== undefined) {
      values.formImage = body.formImage;
    }

    const newForm = await db.insert(eventForm).values(values).returning();

    return NextResponse.json(newForm[0], { status: 201 });
  } catch (error) {
    console.error("Error creating event form:", error);
    return NextResponse.json(
      {
        error: "Failed to create event form",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// PATCH: Update form for an event
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
    const { id: eventId } = await params;
    const body = await request.json();

    // Prepare update values
    const updateValues: any = {
      formSchema: body.formSchema || [],
      title: body.title,
      description: body.description,
      successMessage: body.successMessage,
      updatedAt: new Date(),
    };

    // Try to include formImage if provided
    if (body.formImage !== undefined) {
      updateValues.formImage = body.formImage;
    }

    const updatedForm = await db
      .update(eventForm)
      .set(updateValues)
      .where(eq(eventForm.eventId, eventId))
      .returning();

    if (updatedForm.length === 0) {
      return NextResponse.json(
        { error: "Form not found for this event" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedForm[0]);
  } catch (error) {
    console.error("Error updating event form:", error);
    return NextResponse.json(
      {
        error: "Failed to update event form",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// DELETE: Delete form for an event
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
    const { id: eventId } = await params;

    const deletedForm = await db
      .delete(eventForm)
      .where(eq(eventForm.eventId, eventId))
      .returning();

    if (deletedForm.length === 0) {
      return NextResponse.json(
        { error: "Form not found for this event" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Form deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event form:", error);
    return NextResponse.json(
      { error: "Failed to delete event form" },
      { status: 500 },
    );
  }
}
