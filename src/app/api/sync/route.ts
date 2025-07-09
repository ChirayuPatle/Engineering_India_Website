import { db } from "@/database/db";
import { membershipForm } from "@/database/schema";
import { user as userSchema } from "@/database/schema/auth-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession(req);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await db.query.user.findFirst({
      where: eq(userSchema.id, session.user.id),
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      // Clear the sheet first
      const clearRes = await fetch(`${process.env.SHEETDB_API_URL!}/all`, {
        method: "DELETE",
      });

      if (!clearRes.ok) {
        const errText = await clearRes.text();
        console.error("SheetDB Clear Error Response:", errText);
        return NextResponse.json(
          { error: "SheetDB clear failed", message: errText },
          { status: 500 },
        );
      }

      const records = await db.select().from(membershipForm);

      if (records.length === 0) {
        return NextResponse.json({ success: true, synced: 0 });
      }

      const formattedData = records.map((record) => ({
        name: record.name,
        email: record.email,
        year: record.year,
        branch: record.branch,
        eventIdea: record.eventIdeas,
        engagedInOtherClub: record.engagedInOtherClub,
        previousExperience: record.previousExperience,
        reasonToJoin: record.reasonToJoin,
        areaOfInterest: record.areaOfInterest,
        createdAt: record.createdAt,
      }));

      const sheetRes = await fetch(process.env.SHEETDB_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formattedData }),
      });

      if (!sheetRes.ok) {
        const errText = await sheetRes.text();
        console.error("SheetDB Error Response:", errText);
        return NextResponse.json(
          { error: "SheetDB failed", message: errText },
          { status: 500 },
        );
      }

      return NextResponse.json({ success: true, synced: formattedData.length });
    } catch (error: any) {
      console.error("Internal Error:", error.message || error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("Authentication Error:", error.message || error);
    return NextResponse.json(
      { error: "Authentication Error" },
      { status: 500 },
    );
  }
}
