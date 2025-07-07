// app/api/generate-ticket/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { registration, ticket } from "@/database/schema/index";
import { v4 as uuid } from "uuid";
import QRCode from "qrcode";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

const generateTicketSchema = z.object({
  registrationId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedBody = generateTicketSchema.parse(body);
    const { registrationId } = validatedBody;

    const existingRegistration = await db.query.registration.findFirst({
      where: eq(registration.id, registrationId),
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { message: "Registration not found" },
        { status: 404 }
      );
    }

    if (existingRegistration.userId !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }
    
    const existingTicket = await db.query.ticket.findFirst({
        where: eq(ticket.registrationId, registrationId),
    });

    if(existingTicket) {
        return NextResponse.json(
            { message: "Ticket already generated for this registration" },
            { status: 409 }
        )
    }

    const ticketCode = uuid();
    const qrPayload = ticketCode;

    const qrImage = await QRCode.toDataURL(qrPayload);

    await db.insert(ticket).values({
      id: ticketCode,
      registrationId,
      ticketCode,
      qrCode: qrImage,
      generatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      ticketCode,
      qrImage,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request body", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Error generating ticket:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
