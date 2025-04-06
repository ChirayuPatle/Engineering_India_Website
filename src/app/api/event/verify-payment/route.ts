import { db } from "@/database/db";
import { payment } from "@/database/schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { registrationId, transactionId, senderName } = await req.json();

    if (!registrationId || !transactionId || !senderName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updated = await db
      .update(payment)
      .set({
        transactionId,
        senderName,
        verifiedBy: "ADMIN",
        verified: true,
        verifiedAt: new Date(),
      })
      .where(eq(payment.registrationId, registrationId));

    if (updated.rowsAffected === 0) {
      return NextResponse.json(
        { error: "No payment record found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
