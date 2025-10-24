import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { eventResource } from "@/database/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> },
) {
  try {
    const { eventId } = await params;
    const user = await getCurrentUser();

    // Get all resources for the event
    let resources = await db
      .select()
      .from(eventResource)
      .where(eq(eventResource.eventId, eventId))
      .orderBy(eventResource.order);

    // Filter based on access level if user is not logged in
    if (!user) {
      resources = resources.filter((r) => r.accessLevel === "public");
    }

    return NextResponse.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
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
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const newResource = await db
      .insert(eventResource)
      .values({
        eventId,
        uploadedBy: user.id,
        ...body,
      })
      .returning();

    return NextResponse.json(newResource[0]);
  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 },
    );
  }
}
