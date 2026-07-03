// app/api/dashboard/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { auth } from "@/lib/auth";
import { eq, gt, desc, inArray } from "drizzle-orm";
import {
  registration,
  event,
  payment,
  user,
  membershipForm,
  hackathon,
} from "@/database/schema";

export async function GET(req: NextRequest) {
  try {
    console.log("[DASHBOARD] Starting dashboard request...");
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      console.log("[DASHBOARD] No session found");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("[DASHBOARD] User ID:", session.user.id);
    const userId = session.user.id;

    // First fetch user registrations WITH event details
    console.log("[DASHBOARD] Fetching user registrations...");
    const userRegistrations = await db
      .select()
      .from(registration)
      .where(eq(registration.userId, userId))
      .leftJoin(event, eq(registration.eventId, event.id));

    console.log(
      "[DASHBOARD] User registrations count:",
      userRegistrations.length,
    );

    // Build the payment query conditionally
    const recentPaymentsPromise =
      userRegistrations.length > 0
        ? db
            .select()
            .from(payment)
            .where(
              inArray(
                payment.registrationId,
                userRegistrations.map((r) => r.registration.id),
              ),
            )
            .orderBy(desc(payment.paymentDate))
            .limit(5)
        : Promise.resolve([]);

    const [
      upcomingEvents,
      allEvents,
      recentPayments,
      currentUser,
      membershipFormStatus,
      allHackathonRegistrations,
    ] = await Promise.all([
      db
        .select()
        .from(event)
        .where(gt(event.startDate, new Date()))
        .orderBy(desc(event.startDate)),
      db.select().from(event), // Fetch ALL events for count
      recentPaymentsPromise,
      db.select().from(user).where(eq(user.id, userId)),
      db.select().from(membershipForm).where(eq(membershipForm.userId, userId)),
      db.select().from(hackathon), // Fetch ALL to filter by email
    ]);

    // Filter hackathon registrations by email (team leader or member)
    const userEmail = session.user.email;
    let hackathonRegistrations: any[] = [];

    if (userEmail) {
      hackathonRegistrations = allHackathonRegistrations.filter((reg) => {
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
          console.error("[DASHBOARD] Error parsing team members:", e);
        }

        return false;
      });
    }

    console.log("[DASHBOARD] All data fetched successfully");
    console.log(
      "[DASHBOARD] Hackathon registrations:",
      hackathonRegistrations.length,
    );

    // Total AVAILABLE events count (all events in DB + hackathon)
    const totalEventsAvailable = allEvents.length + 1; // +1 for hackathon

    // Total USER registrations count (events user registered for + hackathon)
    const totalRegistrations =
      userRegistrations.length + hackathonRegistrations.length;

    console.log("[DASHBOARD] Total Events Available:", totalEventsAvailable);
    console.log("[DASHBOARD] Total User Registrations:", totalRegistrations);
    console.log("[DASHBOARD] Event Registrations:", userRegistrations.length);
    console.log(
      "[DASHBOARD] Hackathon Registrations:",
      hackathonRegistrations.length,
    );

    // Format registered events with full event details
    const formattedRegisteredEvents = userRegistrations
      .filter((reg) => reg.event !== null) // Only include events that exist
      .map((reg) => ({
        id: reg.registration.id,
        eventId: reg.registration.eventId,
        userId: reg.registration.userId,
        createdAt: reg.registration.createdAt,
        event: reg.event, // Full event details
      }));

    console.log(
      "[DASHBOARD] Formatted Events:",
      formattedRegisteredEvents.length,
    );

    // Format hackathon registrations as payments
    const hackathonPayments = hackathonRegistrations.map((hack) => ({
      id: hack.id,
      eventName: "HACKATHON 2025",
      amount: 200, // Hackathon fee
      date: hack.createdAt,
      status:
        hack.status === "verified"
          ? "completed"
          : hack.status === "pending"
            ? "pending"
            : "failed",
      transactionId: hack.transactionId || "N/A",
      paymentScreenshot: hack.paymentScreenshot,
      isHackathon: true, // Flag to identify hackathon payments
    }));

    // Combine event payments and hackathon payments
    const allPayments = [...recentPayments, ...hackathonPayments].sort(
      (a, b) => {
        const dateA = "paymentDate" in a ? a.paymentDate : a.date;
        const dateB = "paymentDate" in b ? b.paymentDate : b.date;
        return new Date(dateB || 0).getTime() - new Date(dateA || 0).getTime();
      },
    );

    console.log(
      "[DASHBOARD] Total Payments (Events + Hackathon):",
      allPayments.length,
    );

    return NextResponse.json({
      registeredEvents: formattedRegisteredEvents,
      upcomingEvents,
      payments: allPayments,
      user: currentUser[0],
      membership: {
        hasSubmitted: membershipFormStatus.length > 0,
      },
      stats: {
        totalRegistrations,
        totalEventsAvailable, // Total events in system (events + hackathon)
        eventRegistrations: userRegistrations.length,
        hackathonRegistrations: hackathonRegistrations.length,
      },
    });
  } catch (err) {
    console.error("[DASHBOARD_GET_ERROR]:", err);
    console.error("Error details:", {
      message: err instanceof Error ? err.message : "Unknown error",
      stack: err instanceof Error ? err.stack : undefined,
      name: err instanceof Error ? err.name : undefined,
    });
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
