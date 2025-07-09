import { db } from "@/database/db";
import { membershipForm } from "@/database/schema";
import { user as userSchema } from "@/database/schema/auth-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");

    if (apiKey !== process.env.GOOGLE_APP_SCRIPT_API_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const records = await db.select().from(membershipForm);

    const formattedData = records.map((record) => ({
      id: record.id, // Assuming 'id' is a unique identifier for duplication checking
      name: record.name,
      email: record.email,
      year: record.year,
      branch: record.branch,
      eventIdea: record.eventIdeas,
      engagedInOtherClub: record.engagedInOtherClub,
      previousExperience: record.previousExperience,
      reasonToJoin: record.reasonToJoin,
      areaOfInterest: record.areaOfInterest,
      createdAt: record.createdAt,
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error: any) {
    console.error("API Error:", error.message || error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message || error },
      { status: 500 },
    );
  }
}
