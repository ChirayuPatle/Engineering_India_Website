import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { registration, formSubmission, eventForm } from "@/database/schema";
import { getCurrentUser } from "@/lib/auth-helpers";
import { v4 as uuid } from "uuid";
import { eq, and } from "drizzle-orm";

// Test endpoint to verify route is accessible
export async function GET() {
  console.log("✅ GET /api/event/register called - Route is accessible!");
  return NextResponse.json({
    message: "Registration API is working! Use POST to register.",
    timestamp: new Date().toISOString(),
    methods: ["POST"],
  });
}

export async function POST(request: NextRequest) {
  console.log("🚀 POST /api/event/register called");
  console.log("Request URL:", request.url);
  console.log("Request method:", request.method);

  try {
    // Get authenticated user
    const user = await getCurrentUser();

    if (!user) {
      console.error("Registration failed: User not authenticated");
      return NextResponse.json(
        { error: "You must be logged in to register for events" },
        { status: 401 },
      );
    }

    const body = await request.json();
    console.log("Registration request body:", JSON.stringify(body, null, 2));

    const { eventId, formData } = body;

    // Validate required fields
    if (!eventId) {
      console.error("Registration failed: Event ID missing");
      return NextResponse.json(
        { error: "Event ID is required", received: body },
        { status: 400 },
      );
    }

    if (!formData || typeof formData !== "object") {
      console.error(
        "Registration failed: Invalid form data",
        typeof formData,
        formData,
      );
      return NextResponse.json(
        {
          error: "Form data is required and must be an object",
          received: {
            formData,
            type: typeof formData,
            isNull: formData === null,
            isUndefined: formData === undefined,
          },
        },
        { status: 400 },
      );
    }

    console.log("✅ Validation passed - eventId:", eventId, "userId:", user.id);

    console.log("✅ Validation passed - eventId:", eventId, "userId:", user.id);

    // Check if user is already registered for this event
    console.log("Checking for existing registration...");
    const existingRegistration = await db
      .select()
      .from(registration)
      .where(
        and(
          eq(registration.eventId, eventId),
          eq(registration.userId, user.id),
        ),
      )
      .limit(1);

    if (existingRegistration.length > 0 && existingRegistration[0]) {
      console.log("❌ User already registered:", existingRegistration[0].id);
      return NextResponse.json(
        {
          error: "You are already registered for this event",
          registrationId: existingRegistration[0].id,
        },
        { status: 400 },
      );
    }

    console.log("✅ No existing registration found");

    // Get the event form to save submission
    console.log("Fetching event form...");
    const eventFormData = await db
      .select()
      .from(eventForm)
      .where(eq(eventForm.eventId, eventId))
      .limit(1);

    console.log("Event form found:", eventFormData.length > 0 ? "Yes" : "No");

    // Create registration
    const registrationId = uuid();
    const now = new Date();

    const registrationData = {
      id: registrationId,
      eventId,
      userId: user.id,
      status: "pending",
      formData: JSON.stringify(formData),
      registeredAt: now,
      createdAt: now,
      updatedAt: now,
    };

    console.log("Inserting registration...");
    await db.insert(registration).values(registrationData);
    console.log("✅ Registration inserted successfully");

    // Save form submission if event has a custom form
    if (eventFormData.length > 0 && eventFormData[0]) {
      console.log("Inserting form submission...");
      const formSubmissionData = {
        id: uuid(),
        formId: eventFormData[0].id,
        eventId: eventId,
        userId: user.id,
        responses: formData,
        ipAddress:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
        status: "pending",
        submittedAt: now,
        updatedAt: now,
      };

      await db.insert(formSubmission).values(formSubmissionData);
      console.log("✅ Form submission inserted successfully");
    }

    console.log("✅ Registration completed successfully");
    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully!",
      registrationId,
    });
  } catch (error: any) {
    console.error("❌ Error registering for event:", error);
    console.error("Error stack:", error.stack);

    // Handle specific database errors
    if (error.message?.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to register for event. Please try again.",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
