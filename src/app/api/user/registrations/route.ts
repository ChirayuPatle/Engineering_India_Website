import { db } from "@/database/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("[REGISTRATIONS] Starting registrations request...");
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      console.log("[REGISTRATIONS] No session found");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("[REGISTRATIONS] User ID:", session.user.id);

    // Fetch regular event registrations
    console.log("[REGISTRATIONS] Fetching event registrations...");
    let eventRegistrations: any[] = [];
    try {
      eventRegistrations = await db.query.registration.findMany({
        where: (reg, { eq }) => eq(reg.userId, session.user.id),
        with: {
          event: true,
        },
      });
      console.log(
        "[REGISTRATIONS] Event registrations count:",
        eventRegistrations.length,
      );
    } catch (eventError) {
      console.error(
        "[REGISTRATIONS] Error fetching event registrations:",
        eventError,
      );
      console.log("[REGISTRATIONS] Continuing without event registrations...");
      // Continue with empty array if query fails
      eventRegistrations = [];
    }

    // Fetch hackathon registrations
    console.log("[REGISTRATIONS] Fetching hackathon registrations...");
    let hackathonRegistrations: any[] = [];
    try {
      const userEmail = session.user.email;
      if (!userEmail) {
        console.log(
          "[REGISTRATIONS] No email in session, skipping hackathon check",
        );
      } else {
        // Fetch ALL hackathon registrations
        const allHackathonRegs = await db.query.hackathon.findMany();
        console.log(
          "[REGISTRATIONS] Total hackathon registrations in DB:",
          allHackathonRegs.length,
        );

        // Filter to find registrations where user is team leader OR team member
        hackathonRegistrations = allHackathonRegs.filter((reg) => {
          // Check if user is team leader
          if (reg.teamLeaderEmail.toLowerCase() === userEmail.toLowerCase()) {
            return true;
          }

          // Check if user is in team members array
          try {
            const members = reg.teamMembers ? JSON.parse(reg.teamMembers) : [];
            if (Array.isArray(members)) {
              return members.some(
                (m) =>
                  m.email && m.email.toLowerCase() === userEmail.toLowerCase(),
              );
            }
          } catch (e) {
            console.error(
              "[REGISTRATIONS] Error parsing team members for reg:",
              reg.id,
              e,
            );
          }

          return false;
        });
      }

      console.log(
        "[REGISTRATIONS] Hackathon registrations count:",
        hackathonRegistrations.length,
      );
    } catch (hackError) {
      console.error(
        "[REGISTRATIONS] Error fetching hackathon registrations:",
        hackError,
      );
      console.log(
        "[REGISTRATIONS] Continuing without hackathon registrations...",
      );
      // Continue with empty array if hackathon table doesn't exist or query fails
      hackathonRegistrations = [];
    }

    // Format regular event registrations
    console.log("[REGISTRATIONS] Formatting event registrations...");
    const formattedEventRegistrations = eventRegistrations.map((reg) => {
      const evt = reg.event; // Type assertion due to drizzle query builder limitation

      return {
        id: reg.id,
        type: "event" as const,
        eventId: reg.eventId,
        title: evt?.name || "Unknown Event",
        image: evt?.bannerImage || null,
        status:
          evt?.startDate && new Date(evt.startDate) < new Date()
            ? "completed"
            : "upcoming",
        description: evt?.description || "",
        date: evt?.startDate
          ? new Date(evt.startDate).toLocaleDateString("en-GB")
          : "TBD",
        time: evt?.startDate
          ? new Date(evt.startDate).toLocaleTimeString()
          : "TBD",
        location: evt?.location || "TBD",
        ticketId: reg.id,
        createdAt: reg.createdAt,
      };
    });

    // Format hackathon registrations
    console.log("[REGISTRATIONS] Formatting hackathon registrations...");
    const formattedHackathonRegistrations = hackathonRegistrations.map(
      (hack) => {
        const statusMap = {
          pending: "pending",
          verified: "upcoming",
          rejected: "rejected",
        } as const;

        // Safely parse team members
        let teamMembersCount = 0;
        try {
          const members = hack.teamMembers ? JSON.parse(hack.teamMembers) : [];
          teamMembersCount = Array.isArray(members) ? members.length : 0;
        } catch (e) {
          console.error("Error parsing team members:", e);
          teamMembersCount = 0;
        }

        return {
          id: hack.id,
          type: "hackathon",
          eventId: "hackathon-2025",
          title: "Hackathon 2025 - " + hack.teamName,
          image: null,
          status: statusMap[hack.status as keyof typeof statusMap] || "pending",
          description: `Team: ${hack.teamName} | Leader: ${hack.teamLeaderName} | Members: ${teamMembersCount + 1}`,
          date: "TBD",
          time: "TBD",
          location: "TBD",
          ticketId: hack.id,
          teamName: hack.teamName,
          paymentStatus: hack.status,
          createdAt: hack.createdAt,
        };
      },
    );

    // Combine and sort by creation date (newest first)
    console.log("[REGISTRATIONS] Combining and sorting registrations...");
    const allRegistrations = [
      ...formattedEventRegistrations,
      ...formattedHackathonRegistrations,
    ].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    console.log(
      "[REGISTRATIONS] Returning",
      allRegistrations.length,
      "registrations",
    );
    return NextResponse.json(allRegistrations, { status: 200 });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
