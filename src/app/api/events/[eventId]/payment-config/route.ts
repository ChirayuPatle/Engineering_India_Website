import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { eventPaymentConfig } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> },
) {
  try {
    const { eventId } = await params;

    const config = await db
      .select()
      .from(eventPaymentConfig)
      .where(eq(eventPaymentConfig.eventId, eventId))
      .limit(1);

    if (config.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(config[0]);
  } catch (error) {
    console.error("Error fetching payment config:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment config" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> },
) {
  try {
    const { eventId } = await params;
    const body = await req.json();

    // Check if config already exists
    const existing = await db
      .select()
      .from(eventPaymentConfig)
      .where(eq(eventPaymentConfig.eventId, eventId))
      .limit(1);

    let result;
    if (existing.length > 0) {
      // Update existing
      result = await db
        .update(eventPaymentConfig)
        .set({
          ...body,
          updatedAt: new Date(),
        })
        .where(eq(eventPaymentConfig.eventId, eventId))
        .returning();
    } else {
      // Create new
      result = await db
        .insert(eventPaymentConfig)
        .values({
          eventId,
          ...body,
        })
        .returning();
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error saving payment config:", error);
    return NextResponse.json(
      { error: "Failed to save payment config" },
      { status: 500 },
    );
  }
}
