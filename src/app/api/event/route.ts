import { db } from "@/database/db";
import { event } from "@/database/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await db.select().from(event);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
