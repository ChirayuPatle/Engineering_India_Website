import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema";
import { desc } from "drizzle-orm";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  try {
    // Fetch all hackathon registrations
    const registrations = await db
      .select()
      .from(hackathon)
      .orderBy(desc(hackathon.createdAt));

    if (!registrations || registrations.length === 0) {
      return NextResponse.json(
        { error: "No registrations found" },
        { status: 404 },
      );
    }

    const rows: Record<string, any>[] = [];

    // Teams to exclude (case-insensitive)
    const excludedTeams = new Set(
      [
        "RuntimeTerror",
        "Pied Pipers",
        "Crazy",
        "Neuro Nexus",
        "Team Ares",
        "DeadPixel",
        "Brocode",
        "Technologia",
        "Phantom Minds",
        "Synergy",
        "Anonymous",
        "Meteorite",
        "Cyber Flares",
        "Innovators",
        "Code Clan",
        "Git_gud",
        "Team Hwaks",
        "Team Vision ML",
        "NEXORA",
        "Devdreamers",
        "Kajukatli",
        "PRIOMAXX",
        "SatvaCoders",
        "Team Destiny",
        "AgriVision",
      ].map((s) => s.toLowerCase()),
    );

    registrations.forEach((reg) => {
      // Skip excluded teams
      const teamNameNorm = (reg.teamName || "").toString().toLowerCase().trim();
      if (excludedTeams.has(teamNameNorm)) return;
      // Team leader as participant
      rows.push({
        "Participant Name": reg.teamLeaderName,
        Email: reg.teamLeaderEmail || "",
        Phone: reg.teamLeaderPhone || "",
        College: reg.institute || "",
        Branch: reg.branch || "",
        Role: "Leader",
        "Team Name": reg.teamName || "",
        "Registration ID": reg.id,
        "Registered At": reg.createdAt
          ? new Date(reg.createdAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })
          : "",
      });

      // Team members (stored as JSON string in teamMembers)
      if (reg.teamMembers) {
        try {
          const members = JSON.parse(reg.teamMembers);
          if (Array.isArray(members)) {
            members.forEach((m: any) => {
              // Only include if a name exists
              if (m && (m.name || m.fullName || m.memberName)) {
                rows.push({
                  "Participant Name":
                    m.name || m.fullName || m.memberName || "",
                  Email: m.email || "",
                  Phone: m.phone || "",
                  College: m.institute || reg.institute || "",
                  Branch: m.branch || reg.branch || "",
                  Role: "Member",
                  "Team Name": reg.teamName || "",
                  "Registration ID": reg.id,
                  "Registered At": reg.createdAt
                    ? new Date(reg.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })
                    : "",
                });
              }
            });
          }
        } catch (e) {
          // If parsing fails, ignore members for this registration
          console.warn("Failed to parse teamMembers for registration", reg.id);
        }
      }
    });

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No participants found" },
        { status: 404 },
      );
    }

    // Prepare workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Column widths
    worksheet["!cols"] = [
      { wch: 30 }, // Participant Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 35 }, // College
      { wch: 20 }, // Branch
      { wch: 12 }, // Role
      { wch: 30 }, // Team Name
      { wch: 15 }, // Registration ID
      { wch: 25 }, // Registered At
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="hackathon-participants-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error exporting participants:", error);
    return NextResponse.json(
      {
        error: "Failed to export participants",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
