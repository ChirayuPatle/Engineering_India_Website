// app/api/validate-ticket/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { ticket } from "@/database/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";

interface AuthUser {
  id: string;
  role: string;
  [key: string]: any; // Allow other properties
}

const verifyTicketSchema = z.object({
  ticket: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const user = session?.user as unknown as AuthUser | undefined;
    const userRole = user?.role;

    if (userRole !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const validatedParams = verifyTicketSchema.parse({
      ticket: searchParams.get("ticket"),
    });
    const { ticket: ticketCode } = validatedParams;

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
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request parameters", errors: err.errors },
        { status: 400 },
      );
    }
    console.error("Ticket validation error:", err);
    return NextResponse.json(
      { message: "Something went wrong while validating the ticket." },
      { status: 500 },
    );
  }
}
