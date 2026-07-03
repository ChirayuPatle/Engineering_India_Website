import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathonFeedback } from "@/database/schema";
import { desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // Fetch all feedback submissions
    const feedbackData = await db
      .select()
      .from(hackathonFeedback)
      .orderBy(desc(hackathonFeedback.createdAt));

    return NextResponse.json({
      success: true,
      count: feedbackData.length,
      feedback: feedbackData,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch feedback data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
