import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  try {
    // Fetch only Round 2 qualified teams
    const round2Teams = await db
      .select()
      .from(hackathon)
      .where(eq(hackathon.round2Qualified, true))
      .orderBy(desc(hackathon.createdAt));

    if (!round2Teams || round2Teams.length === 0) {
      return NextResponse.json(
        { error: "No Round 2 teams found" },
        { status: 404 },
      );
    }

    const rows: Record<string, any>[] = [];

    round2Teams.forEach((reg) => {
      rows.push({
        "Participant Name": reg.teamLeaderName,
        Email: reg.teamLeaderEmail || "",
        Phone: reg.teamLeaderPhone || "",
        College: reg.institute || "",
        Branch: reg.branch || "",
        Role: "Leader",
        "Team Name": reg.teamName || "",
        "Registration ID": reg.id,
        "Round 2 Qualified": "Yes",
        "Registered At": reg.createdAt
          ? new Date(reg.createdAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })
          : "",
      });

      if (reg.teamMembers) {
        try {
          const members = JSON.parse(reg.teamMembers);
          if (Array.isArray(members)) {
            members.forEach((m: any) => {
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
                  "Round 2 Qualified": "Yes",
                  "Registered At": reg.createdAt
                    ? new Date(reg.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })
                    : "",
                });
              }
            });
          }
        } catch (error) {
          console.warn("Failed to parse teamMembers for Round 2 team", reg.id);
        }
      }
    });

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No Round 2 participants found" },
        { status: 404 },
      );
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    worksheet["!cols"] = [
      { wch: 30 }, // Participant Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 35 }, // College
      { wch: 20 }, // Branch
      { wch: 12 }, // Role
      { wch: 30 }, // Team Name
      { wch: 15 }, // Registration ID
      { wch: 18 }, // Round 2 Qualified
      { wch: 25 }, // Registered At
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Round 2 Participants");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="hackathon-round2-participants-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error exporting Round 2 participants:", error);
    return NextResponse.json(
      {
        error: "Failed to export Round 2 participants",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
