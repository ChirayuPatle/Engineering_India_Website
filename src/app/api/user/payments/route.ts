import { db } from "@/database/db";
import { auth } from "@/lib/auth";
import { payment, type event, hackathon } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const paymentStatusSchema = z.object({
  status: z.enum(["paid", "pending", "rejected"]).optional(),
});

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const validatedParams = paymentStatusSchema.parse({
      status: searchParams.get("status"),
    });

    const { status } = validatedParams;

    const baseCondition = eq(payment.userId, session.user.id);

    const statusCondition =
      status === "paid"
        ? eq(payment.verified, true)
        : status === "pending"
          ? and(eq(payment.verified, false), eq(payment.rejected, false))
          : status === "rejected"
            ? eq(payment.rejected, true)
            : undefined;

    const conditions = [baseCondition, statusCondition].filter(
      Boolean,
    ) as any[];

    const userPayments = await db.query.payment.findMany({
      where: and(...conditions),
      with: {
        event: {
          columns: {
            id: true,
            name: true,
            bannerImage: true, // Optional: Add fields you need
          },
        },
      },
    });

    // Fetch hackathon registrations (they also count as payments)
    const hackathonRegistrations = await db.query.hackathon.findMany({
      where: eq(hackathon.userId, session.user.id),
    });

    type EventType = typeof event.$inferSelect;

    const formattedPayments = userPayments.map((p) => {
      const eventData = p.event as EventType | undefined;
      return {
        id: p.id,
        eventName: eventData?.name || "Unknown Event",
        amount: Number(p.amount),
        status: p.rejected ? "rejected" : p.verified ? "paid" : "pending",
        transactionId: p.transactionId,
        paymentScreenshot: null,
        date: new Date(
          p.paymentDate ?? p.createdAt ?? Date.now(),
        ).toLocaleDateString("en-GB"),
      };
    });

    const formattedHackathonPayments = hackathonRegistrations.map(
      (h: typeof hackathon.$inferSelect) => {
        const statusMap = {
          pending: "pending",
          verified: "paid",
          rejected: "rejected",
        } as const;

        return {
          id: h.id,
          eventName: "Hackathon 2025",
          amount: 300, // Fixed hackathon registration fee
          status: statusMap[h.status as keyof typeof statusMap] || "pending",
          transactionId: h.transactionId || "N/A",
          paymentScreenshot: h.paymentScreenshot,
          date: new Date(h.createdAt).toLocaleDateString("en-GB"),
        };
      },
    );

    // Combine both types of payments
    const allPayments = [...formattedPayments, ...formattedHackathonPayments];

    // Filter by status if provided
    const filtered = status
      ? allPayments.filter((p) => {
          if (status === "paid") return p.status === "paid";
          if (status === "pending") return p.status === "pending";
          if (status === "rejected") return p.status === "rejected";
          return true;
        })
      : allPayments;

    // Sort by date (newest first)
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return NextResponse.json(filtered, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request parameters", errors: err.errors },
        { status: 400 },
      );
    }
    console.error("Error fetching payments:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
