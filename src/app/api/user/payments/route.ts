import { db } from "@/database/db";
import { auth } from "@/lib/auth";
import { payment, type event, type hackathon } from "@/database/schema";
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
    const statusParam = searchParams.get("status");

    // Only validate if status is provided
    const validatedParams = statusParam
      ? paymentStatusSchema.parse({ status: statusParam })
      : { status: undefined };

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
    ) as (typeof baseCondition | typeof statusCondition)[];

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
    const userEmail = session.user.email;
    let hackathonRegistrations: any[] = [];

    if (userEmail) {
      // Fetch ALL hackathon registrations and filter by email
      const allHackathonRegs = await db.query.hackathon.findMany();

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
          console.error("[PAYMENTS] Error parsing team members:", e);
        }

        return false;
      });
    }

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
        isHackathon: false,
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
          eventName: "HACKATHON 2025",
          amount: 200, // Hackathon registration fee
          status: statusMap[h.status as keyof typeof statusMap] || "pending",
          transactionId: h.transactionId || "N/A",
          paymentScreenshot: h.paymentScreenshot,
          isHackathon: true,
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
