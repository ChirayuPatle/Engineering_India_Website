import { db } from "@/database/db";
import { payment } from "@/database/schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";

const verifyPaymentSchema = z.object({
  registrationId: z.string(),
  transactionId: z.string(),
  senderName: z.string(),
});

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const userId = session?.user.id;
    const userRole = session?.user.role;

    if (!userId || userRole !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedBody = verifyPaymentSchema.parse(body);
    const { registrationId, transactionId, senderName } = validatedBody;

    const updated = await db
      .update(payment)
      .set({
        transactionId,
        senderName,
        verifiedBy: userId,
        verified: true,
        verifiedAt: new Date(),
      })
      .where(eq(payment.registrationId, registrationId));

    if (updated.rowsAffected === 0) {
      return NextResponse.json(
        { message: "No payment record found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request body", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
