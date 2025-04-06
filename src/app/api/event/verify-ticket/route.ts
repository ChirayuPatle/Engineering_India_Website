// app/api/validate-ticket/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { ticket } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const ticketCode = req.nextUrl.searchParams.get("ticket");

    if (!ticketCode) {
      return NextResponse.json(
        { error: "Missing ticket code" },
        { status: 400 },
      );
    }

    // Find ticket and its registration relation
    const foundTicket = await db.query.ticket.findFirst({
      where: eq(ticket.ticketCode, ticketCode),
      with: {
        registration: true, // works only if schema passed into drizzle()
      },
    });

    if (!foundTicket) {
      return NextResponse.json(
        { status: "failed", message: "Invalid ticket" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: "verified",
      ticket: foundTicket,
      registration: foundTicket.registration,
    });
  } catch (err) {
    console.error("Ticket validation error:", err);
    return NextResponse.json(
      { error: "Something went wrong while validating the ticket." },
      { status: 500 },
    );
  }
}
