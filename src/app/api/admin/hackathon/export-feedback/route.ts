import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathonFeedback } from "@/database/schema";
import { desc } from "drizzle-orm";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  try {
    // Fetch all feedback submissions
    const feedbackData = await db
      .select()
      .from(hackathonFeedback)
      .orderBy(desc(hackathonFeedback.createdAt));

    if (feedbackData.length === 0) {
      return NextResponse.json(
        { error: "No feedback data found" },
        { status: 404 },
      );
    }

    // Prepare data for Excel
    const excelData = feedbackData.map((feedback, index) => ({
      "S.No": index + 1,
      Name: feedback.name,
      Email: feedback.email,
      Phone: feedback.phone,
      College: feedback.college,
      Branch: feedback.branch,
      Year: feedback.year,
      "Overall Rating": feedback.overallRating,
      "Experience Rating": feedback.experienceRating,
      "Organization Rating": feedback.organizationRating,
      "Venue Rating": feedback.venueRating || "N/A",
      "Food Rating": feedback.foodRating || "N/A",
      "Mentorship Rating": feedback.mentorshipRating || "N/A",
      "What You Liked": feedback.whatYouLiked || "",
      Improvements: feedback.improvements || "",
      Suggestions: feedback.suggestions || "",
      "Would Recommend": feedback.wouldRecommend ? "Yes" : "No",
      "Submitted At": new Date(feedback.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Auto-size columns
    const columnWidths = [
      { wch: 6 }, // S.No
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 35 }, // College
      { wch: 30 }, // Branch
      { wch: 8 }, // Year
      { wch: 15 }, // Overall Rating
      { wch: 18 }, // Experience Rating
      { wch: 20 }, // Organization Rating
      { wch: 13 }, // Venue Rating
      { wch: 13 }, // Food Rating
      { wch: 18 }, // Mentorship Rating
      { wch: 50 }, // What You Liked
      { wch: 50 }, // Improvements
      { wch: 50 }, // Suggestions
      { wch: 18 }, // Would Recommend
      { wch: 20 }, // Submitted At
    ];
    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Return the Excel file
    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="hackathon-feedback-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating Excel:", error);
    return NextResponse.json(
      {
        error: "Failed to export feedback",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
