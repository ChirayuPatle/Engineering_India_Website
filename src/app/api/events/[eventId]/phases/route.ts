import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { eventPhase } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> },
) {
  try {
    const { eventId } = await params;

    const phases = await db
      .select()
      .from(eventPhase)
      .where(eq(eventPhase.eventId, eventId))
      .orderBy(eventPhase.phaseNumber);

    return NextResponse.json(phases);
  } catch (error) {
    console.error("Error fetching event phases:", error);
    return NextResponse.json(
      { error: "Failed to fetch phases" },
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

    const newPhase = await db
      .insert(eventPhase)
      .values({
        eventId,
        ...body,
      })
      .returning();

    return NextResponse.json(newPhase[0]);
  } catch (error) {
    console.error("Error creating phase:", error);
    return NextResponse.json(
      { error: "Failed to create phase" },
      { status: 500 },
    );
  }
}
