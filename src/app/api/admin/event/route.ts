import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { event } from "@/database/schema";
import { requireAdmin } from "@/lib/auth-helpers";
import { v4 as uuid } from "uuid";

export async function POST(_req: NextRequest) {
  // Check admin authentication
  const authResult = await requireAdmin();
  if (!authResult.authorized || !authResult.user) {
    return NextResponse.json(
      { error: authResult.error || "Unauthorized" },
      { status: 401 },
    );
  }

  const id = uuid();

  await db.insert(event).values({
    name: "Sample Event",
    description: "This is a dummy event description.",
    startDate: new Date(Date.now()), // Convert to Date object
    endDate: new Date(Date.now() + 86400000), // Convert to Date object
    timeline: JSON.stringify(["10:00 AM - Welcome", "11:00 AM - Keynote"]),
    prizes: JSON.stringify([
      { position: "1st", prize: "₹10,000" },
      { position: "2nd", prize: "₹5,000" },
    ]),
    faqs: JSON.stringify([
      { question: "Who can participate?", answer: "Anyone." },
      { question: "Is there a fee?", answer: "No, it's free." },
    ]),
    organizerContact: "9876543210",
    coOrganizerContact: "8765432109",
    discordLink: "https://discord.gg/dummylink",
    whatsappLink: "https://chat.whatsapp.com/dummylink",
    bannerImage: "https://example.com/banner.png",
    gallery: JSON.stringify([
      "https://example.com/gallery1.jpg",
      "https://example.com/gallery2.jpg",
    ]),
    details: "This event is organized by the Engineering India Club.",
    rules: "1. Be punctual\n2. Respect everyone",
    createdAt: new Date(Date.now()), // Convert to Date object
    updatedAt: new Date(Date.now()), // Convert to Date object
  });

  return NextResponse.json({ success: true, id });
}
