import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathon } from "@/database/schema/hackathon-schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Await params to fix Next.js 15 async API
    const { id: registrationId } = await params;

    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to update registration." },
        { status: 401 },
      );
    }

    const userEmail = session.user.email;

    // Get the existing registration
    const existingRegistrations = await db
      .select()
      .from(hackathon)
      .where(eq(hackathon.id, registrationId))
      .limit(1);

    if (existingRegistrations.length === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    const existingRegistration = existingRegistrations[0];

    if (!existingRegistration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    // Verify that the user is the team leader
    if (
      existingRegistration.teamLeaderEmail.toLowerCase() !==
      userEmail?.toLowerCase()
    ) {
      return NextResponse.json(
        { error: "Only the team leader can edit the team" },
        { status: 403 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const teamMembersJson = body.teamMembers as string | undefined;
    const teamName = body.teamName as string | undefined;
    const teamLeaderName = body.teamLeaderName as string | undefined;
    const teamLeaderPhone = body.teamLeaderPhone as string | undefined;
    const teamLeaderGender = body.teamLeaderGender as string | undefined;
    const institute = body.institute as string | undefined;
    const branch = body.branch as string | undefined;
    const year = body.year as string | undefined;

    // Prepare update object
    const updateData: Partial<typeof hackathon.$inferInsert> = {
      updatedAt: new Date(),
    };

    // Validate and add team name if provided
    if (teamName !== undefined) {
      if (!teamName || teamName.trim().length === 0) {
        return NextResponse.json(
          { error: "Team name cannot be empty" },
          { status: 400 },
        );
      }

      // Check if new team name is already taken by another team
      if (teamName !== existingRegistration.teamName) {
        const existingTeam = await db
          .select()
          .from(hackathon)
          .where(eq(hackathon.teamName, teamName))
          .limit(1);

        if (existingTeam.length > 0) {
          return NextResponse.json(
            { error: "This team name is already taken" },
            { status: 400 },
          );
        }
      }

      updateData.teamName = teamName;
    }

    // Validate and add team leader details if provided
    const phoneRegex = /^[0-9]{10}$/;

    if (teamLeaderName !== undefined) {
      if (!teamLeaderName || teamLeaderName.trim().length === 0) {
        return NextResponse.json(
          { error: "Team leader name cannot be empty" },
          { status: 400 },
        );
      }
      updateData.teamLeaderName = teamLeaderName;
    }

    if (teamLeaderPhone !== undefined) {
      if (!phoneRegex.test(teamLeaderPhone)) {
        return NextResponse.json(
          { error: "Phone number must be 10 digits" },
          { status: 400 },
        );
      }
      updateData.teamLeaderPhone = teamLeaderPhone;
    }

    if (teamLeaderGender !== undefined) {
      if (!teamLeaderGender || teamLeaderGender.trim().length === 0) {
        return NextResponse.json(
          { error: "Team leader gender cannot be empty" },
          { status: 400 },
        );
      }
      updateData.teamLeaderGender = teamLeaderGender;
    }

    if (institute !== undefined) {
      if (!institute || institute.trim().length === 0) {
        return NextResponse.json(
          { error: "Institute name cannot be empty" },
          { status: 400 },
        );
      }
      updateData.institute = institute;
    }

    if (branch !== undefined) {
      if (!branch || branch.trim().length === 0) {
        return NextResponse.json(
          { error: "Branch cannot be empty" },
          { status: 400 },
        );
      }
      updateData.branch = branch;
    }

    if (year !== undefined) {
      if (!year || year.trim().length === 0) {
        return NextResponse.json(
          { error: "Year cannot be empty" },
          { status: 400 },
        );
      }
      updateData.year = year;
    }

    // Parse and validate team members if provided
    let teamMembers: Array<{
      name: string;
      email: string;
      phone: string;
      gender: string;
      branch: string;
      year: string;
    }> = [];
    if (teamMembersJson !== undefined) {
      try {
        teamMembers = JSON.parse(teamMembersJson || "[]") as Array<{
          name: string;
          email: string;
          phone: string;
          gender: string;
          branch: string;
          year: string;
        }>;

        // Validate team size (2-4 including leader)
        const totalTeamSize = teamMembers.length + 1;
        if (totalTeamSize < 2 || totalTeamSize > 4) {
          return NextResponse.json(
            {
              error:
                "Team size must be between 2 and 4 members (including leader)",
            },
            { status: 400 },
          );
        }

        // Validate each team member
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        for (const member of teamMembers) {
          if (
            !member.name ||
            !member.email ||
            !member.phone ||
            !member.gender ||
            !member.branch ||
            !member.year
          ) {
            return NextResponse.json(
              {
                error:
                  "All team members must have name, email, phone, gender, branch, and year",
              },
              { status: 400 },
            );
          }

          if (!emailRegex.test(member.email)) {
            return NextResponse.json(
              { error: `Invalid email format for team member: ${member.name}` },
              { status: 400 },
            );
          }

          if (!phoneRegex.test(member.phone)) {
            return NextResponse.json(
              { error: `Invalid phone number for team member: ${member.name}` },
              { status: 400 },
            );
          }
        }

        // Check for duplicate emails within team (including leader)
        const allEmails = [
          existingRegistration.teamLeaderEmail,
          ...teamMembers.map((m: { email: string }) => m.email),
        ];
        const uniqueEmails = new Set(
          allEmails.map((email) => email.toLowerCase()),
        );
        if (uniqueEmails.size !== allEmails.length) {
          return NextResponse.json(
            { error: "Duplicate emails found within the team" },
            { status: 400 },
          );
        }

        if (teamMembersJson) {
          updateData.teamMembers = teamMembersJson;
        }
      } catch (_error) {
        return NextResponse.json(
          { error: "Invalid team members data" },
          { status: 400 },
        );
      }
    }

    // Update the registration
    await db
      .update(hackathon)
      .set(updateData)
      .where(eq(hackathon.id, registrationId));

    return NextResponse.json(
      {
        success: true,
        message: "Team updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// GET endpoint to fetch a specific registration
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Await params to fix Next.js 15 async API
    const { id: registrationId } = await params;

    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrations = await db
      .select()
      .from(hackathon)
      .where(eq(hackathon.id, registrationId))
      .limit(1);

    if (registrations.length === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    const registration = registrations[0];

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    // Check if user has access (team leader or member)
    const userEmail = session.user.email?.toLowerCase();
    const isLeader = registration.teamLeaderEmail.toLowerCase() === userEmail;

    let isMember = false;
    if (!isLeader) {
      const members = JSON.parse(registration.teamMembers || "[]");
      isMember = members.some(
        (m: { email: string }) => m.email.toLowerCase() === userEmail,
      );
    }

    if (!isLeader && !isMember) {
      return NextResponse.json(
        { error: "You don't have access to this registration" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      {
        registration: {
          ...registration,
          teamMembers: JSON.parse(registration.teamMembers || "[]"),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
