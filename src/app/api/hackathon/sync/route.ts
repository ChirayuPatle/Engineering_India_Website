/**
 * API Endpoint to Sync Hackathon Registrations from Database to Google Sheets
 *
 * This endpoint fetches all hackathon registrations from the Turso database
 * and returns them in a format that Google Apps Script can consume.
 *
 * Security: Protected by API key
 */

import { db } from "@/database/db";
import { hackathon } from "@/database/schema/hackathon-schema";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Verify API key for security
    const apiKey = request.headers.get("x-api-key");
    const expectedApiKey = process.env.GOOGLE_APP_SCRIPT_API_KEY;

    if (!expectedApiKey) {
      console.error("GOOGLE_APP_SCRIPT_API_KEY not set in environment");
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error",
        },
        { status: 500 },
      );
    }

    if (apiKey !== expectedApiKey) {
      console.error("Invalid API key provided");
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // Fetch all hackathon registrations from database
    console.log("Fetching all hackathon registrations from database...");
    const registrations = await db.select().from(hackathon);

    console.log(`Found ${registrations.length} hackathon registrations`);

    // Transform data to match Google Sheets format
    const formattedData = registrations.map((reg) => {
      // Parse team members JSON
      const teamMembers = reg.teamMembers ? JSON.parse(reg.teamMembers) : [];
      const member1 = teamMembers[0] || {};
      const member2 = teamMembers[1] || {};
      const member3 = teamMembers[2] || {};

      return {
        id: reg.id, // Unique ID for duplication checking
        registrationId: reg.id,
        timestamp: reg.createdAt?.toISOString() || new Date().toISOString(),
        teamName: reg.teamName,

        // Team Leader Info
        leaderName: reg.teamLeaderName,
        leaderEmail: reg.teamLeaderEmail,
        leaderPhone: reg.teamLeaderPhone,
        leaderGender: reg.teamLeaderGender,

        // Institute Info
        institute: reg.institute,
        branch: reg.branch,
        year: reg.year,

        // Team Size
        teamSize: teamMembers.length + 1, // Leader + members

        // Member 1
        member1Name: member1.name || "",
        member1Email: member1.email || "",
        member1Phone: member1.phone || "",
        member1Gender: member1.gender || "",
        member1Branch: member1.branch || "",
        member1Year: member1.year || "",

        // Member 2
        member2Name: member2.name || "",
        member2Email: member2.email || "",
        member2Phone: member2.phone || "",
        member2Gender: member2.gender || "",
        member2Branch: member2.branch || "",
        member2Year: member2.year || "",

        // Member 3
        member3Name: member3.name || "",
        member3Email: member3.email || "",
        member3Phone: member3.phone || "",
        member3Gender: member3.gender || "",
        member3Branch: member3.branch || "",
        member3Year: member3.year || "",

        // Payment Info
        transactionId: reg.transactionId || "N/A",
        paymentScreenshotUrl: reg.paymentScreenshot || "",

        // Status
        status: reg.status || "pending",
      };
    });

    return NextResponse.json(
      {
        success: true,
        count: formattedData.length,
        data: formattedData,
        message: `Successfully fetched ${formattedData.length} hackathon registrations`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in hackathon sync API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
