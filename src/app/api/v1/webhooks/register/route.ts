import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { env } from "@/env";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  console.log("\nREQUEST in the webhook pending......\n");

  if (!WEBHOOK_SECRET) {
    return new Response("Webhook secret not found", { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Invalid request - No Svix Headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  const svixHeaders = {
    "svix-id": svix_id,
    "svix-timestamp": svix_id,
    "svix-signature": svix_timestamp,
  };
  try {
    evt = wh.verify(body, svixHeaders) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook", error);
    return new Response("Invalid request - Invalid signature", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      const { email_addresses, primary_email_address_id } = evt.data;

      const primaryEmail = email_addresses.find(
        (email) => email.id === primary_email_address_id,
      );

      if (!primaryEmail) {
        return new Response("Invalid request - No primary email found", {
          status: 400,
        });
      }

      const newUser = await prisma.user.create({
        data: {
          id: evt.data.id,
          email: primaryEmail.email_address,
          //TODO: - Check this name field
          name:
            evt.data.username ||
            evt.data.first_name ||
            evt.data.last_name ||
            "User",
        },
      });

      console.log("New User Created");
    } catch (error) {
      return new Response("Error creating user", { status: 500 });
    }
  }

  return new Response("webhook recieved successfully", { status: 200 });
}
