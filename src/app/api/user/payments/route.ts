import { db } from "@/database/db";
import { auth } from "@/lib/auth";
import { payment, type event } from "@/database/schema";
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

    type EventType = typeof event.$inferSelect;

    const formatted = userPayments.map((p) => {
      const eventData = p.event as EventType | undefined;
      return {
        id: p.id,
        eventName: eventData?.name || "Unknown Event",
        amount: Number(p.amount),
        status: p.rejected ? "rejected" : p.verified ? "paid" : "pending",
        transactionId: p.transactionId,
        date: new Date(p.paymentDate ?? p.createdAt ?? Date.now()).toDateString(),
      };
    });

    return NextResponse.json(formatted, { status: 200 });
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
