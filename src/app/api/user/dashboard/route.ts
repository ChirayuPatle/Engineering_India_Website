// app/api/dashboard/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { auth } from "@/lib/auth";
import { eq, gt, desc } from "drizzle-orm";
import { registration, event, payment } from "@/database/schema"; // Ensure correct path

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [registeredEvents, upcomingEvents, recentPayments] =
      await Promise.all([
        db.select().from(registration).where(eq(registration.userId, userId)),

        db
          .select()
          .from(event)
          .where(gt(event.startDate, new Date()))
          .orderBy(desc(event.startDate)),

        db
          .select()
          .from(payment)
          .where(
            eq(
              payment.registrationId,
              db
                .select({ id: registration.id })
                .from(registration)
                .where(eq(registration.userId, userId)),
            ),
          )
          .orderBy(desc(payment.paymentDate))
          .limit(5),
      ]);

    return NextResponse.json({
      registeredEvents,
      upcomingEvents,
      recentPayments,
    });
  } catch (err) {
    console.error("[DASHBOARD_GET_ERROR]:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
