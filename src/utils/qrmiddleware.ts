import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/database/db";
import { ticket } from "@/database/schema/event-schema";

export async function generateTicketAndQR(registrationId: string) {
  const ticketCode = uuidv4();

  // This can be the actual ticketCode or a link to verify it
  const qrPayload = `engineering-india://ticket/${ticketCode}`;
  const qrImage = await QRCode.toDataURL(qrPayload); // returns base64 string

  await db.insert(ticket).values({
    id: ticketCode,
    registrationId,
    ticketCode,
    qrCode: qrImage,
    generatedAt: new Date(),
  });

  return { ticketCode, qrImage };
}
