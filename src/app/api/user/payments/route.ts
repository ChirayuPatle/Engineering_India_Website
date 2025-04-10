// app/api/user/payments/route.ts
import { db } from "@/database/db";
import { auth } from "@/lib/auth";
import { payment, event } from "@/database/schema";
import { eq, and, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const conditions = [eq(payment.userId, session.user.id)];

    if (status === "paid") {
      conditions.push(eq(payment.verified, true));
    } else if (status === "pending") {
      conditions.push(eq(payment.verified, false));
    } else if (status === "rejected") {
      conditions.push(eq(payment.rejected, true));
    }

    const userPayments = await db
      .select()
      .from(payment)
      .where(and(...conditions));

    const eventIds = [...new Set(userPayments.map((p) => p.eventId))];
    const eventList = await db
      .select({ id: event.id, name: event.name })
      .from(event)
      .where(inArray(event.id, eventIds));

    const eventMap = new Map(eventList.map((e) => [e.id, e.name]));

    const formatted = userPayments.map((p) => ({
      id: p.id,
      eventName: eventMap.get(p.eventId) || "Unknown Event",
      amount: Number(p.amount),
      status: p.rejected ? "rejected" : p.verified ? "paid" : "pending",
      transactionId: p.transactionId,
      date: new Date(p.paymentDate ?? p.createdAt ?? Date.now()).toDateString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
