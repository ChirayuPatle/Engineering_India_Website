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

    // First fetch user registrations to check if there are any
    console.log("[DASHBOARD] Fetching user registrations...");
    const userRegistrations = await db
      .select()
      .from(registration)
      .where(eq(registration.userId, userId));

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
                userRegistrations.map((r) => r.id),
              ),
            )
            .orderBy(desc(payment.paymentDate))
            .limit(5)
        : Promise.resolve([]);

    const [
      upcomingEvents,
      recentPayments,
      currentUser,
      membershipFormStatus,
      hackathonRegistrations,
    ] = await Promise.all([
      db
        .select()
        .from(event)
        .where(gt(event.startDate, new Date()))
        .orderBy(desc(event.startDate)),
      recentPaymentsPromise,
      db.select().from(user).where(eq(user.id, userId)),
      db.select().from(membershipForm).where(eq(membershipForm.userId, userId)),
      db.select().from(hackathon).where(eq(hackathon.userId, userId)),
    ]);

    console.log("[DASHBOARD] All data fetched successfully");
    console.log(
      "[DASHBOARD] Hackathon registrations:",
      hackathonRegistrations.length,
    );

    // Total registrations count (event registrations + hackathon registrations)
    const totalRegistrations =
      userRegistrations.length + hackathonRegistrations.length;

    return NextResponse.json({
      registeredEvents: userRegistrations,
      upcomingEvents,
      payments: recentPayments,
      user: currentUser[0],
      membership: {
        hasSubmitted: membershipFormStatus.length > 0,
      },
      stats: {
        totalRegistrations,
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
