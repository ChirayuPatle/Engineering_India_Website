import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema";
import { auth } from "@/lib/auth";
import { isNotNull } from "drizzle-orm";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Add admin role check here
    // For now, allowing any authenticated user
    // if (session.user.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    // }

    // Fetch all hackathon registrations that have submitted Round 1 PPT
    const submittedTeams = await db
      .select()
      .from(hackathon)
      .where(isNotNull(hackathon.round1PptUrl));

    // Filter to only include teams with valid PPT URLs (non-empty after trim)
    const validSubmissions = submittedTeams.filter((team) =>
      team.round1PptUrl?.trim(),
    );

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();

    // Prepare data for Excel sheet
    const data = validSubmissions.map((team) => ({
      "Team Name": team.teamName,
      "PPT Link": team.round1PptUrl || "",
      "Problem Clarity": "",
      Feasibility: "",
      Usefulness: "",
      "Idea Presentation": "",
      Total: "",
    }));

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Set column widths for better readability
    worksheet["!cols"] = [
      { wch: 25 }, // Team Name
      { wch: 50 }, // PPT Link
      { wch: 15 }, // Problem Clarity
      { wch: 12 }, // Feasibility
      { wch: 12 }, // Usefulness
      { wch: 18 }, // Idea Presentation
      { wch: 8 }, // Total
    ];

    // Make PPT links clickable in Excel
    validSubmissions.forEach((team, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: index + 1, c: 1 }); // Column B (PPT Link), row index + 1 for header
      const pptUrl = team.round1PptUrl?.trim();

      if (pptUrl && worksheet[cellAddress]) {
        // Add hyperlink to the cell
        worksheet[cellAddress].l = {
          Target: pptUrl,
          Tooltip: "Click to open PPT",
        };
        // Set the cell value to the URL
        worksheet[cellAddress].v = pptUrl;
      }
    });

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Round 1 Submissions");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Return Excel file
    const filename = `hackathon-round1-submissions-${new Date().toISOString().split("T")[0]}.xlsx`;

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("[EXPORT_ROUND1_ERROR]:", error);
    return NextResponse.json(
      {
        error: "Failed to export Round 1 submissions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
