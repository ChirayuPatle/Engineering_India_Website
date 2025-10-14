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
} from "@/database/schema";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [
      userRegistrations,
      upcomingEvents,
      recentPayments,
      currentUser,
      membershipFormStatus,
    ] = await Promise.all([
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
          inArray(
            payment.registrationId,
            db
              .select({ id: registration.id })
              .from(registration)
              .where(eq(registration.userId, userId)),
          ),
        )
        .orderBy(desc(payment.paymentDate))
        .limit(5),
      db.select().from(user).where(eq(user.id, userId)),
      db.select().from(membershipForm).where(eq(membershipForm.userId, userId)),
    ]);

    return NextResponse.json({
      registeredEvents: userRegistrations,
      upcomingEvents,
      payments: recentPayments,
      user: currentUser[0],
      membership: {
        hasSubmitted: membershipFormStatus.length > 0,
      },
    });
  } catch (err) {
    console.error("[DASHBOARD_GET_ERROR]:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
