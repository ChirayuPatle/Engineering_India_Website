import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { membershipForm } from "@/database/schema/membership-schema";
import { membershipFormSchema } from "@/lib/schemas";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getGoogleSheetsClient, updateSheet } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check for existing submission
    const existing = await db.query.membershipForm.findFirst({
      where: eq(membershipForm.userId, session.user.id),
    });

    if (existing) {
      return NextResponse.json(
        { message: "You have already submitted the form." },
        { status: 409 },
      );
    }

    // Validate request body
    const body = await req.json();
    const parsed = membershipFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data", errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const {
      name,
      year,
      branch,
      email,
      areaOfInterest,
      engagedInOtherClub,
      previousExperience,
      reasonToJoin,
      eventIdeas,
    } = parsed.data;

    // Insert data into database
    await db.insert(membershipForm).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      name,
      year,
      branch,
      email,
      areaOfInterest: JSON.stringify(areaOfInterest),
      engagedInOtherClub,
      previousExperience,
      reasonToJoin,
      eventIdeas,
    });

    // Append data to Google Sheet
    try {
      const sheets = await getGoogleSheetsClient();
      await updateSheet(sheets, [
        new Date().toISOString(),
        name,
        year,
        branch,
        email,
        JSON.stringify(areaOfInterest),
        engagedInOtherClub,
        previousExperience,
        reasonToJoin,
        eventIdeas,
      ]);
    } catch (error) {
      console.error("Error appending to Google Sheet:", error);
      // Continue without returning an error to the client
    }

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting membership form:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
