// app/api/generate-ticket/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { ticket } from "@/database/schema/index";
import { v4 as uuid } from "uuid";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  try {
    const { registrationId } = await req.json();

    if (!registrationId) {
      return NextResponse.json(
        { error: "Missing registrationId" },
        { status: 400 },
      );
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
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
