import { db } from "@/database/db";
import { user } from "@/database/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();

  // 🛡️ Disallow updating `email`
  delete body.email;

  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const userId = session?.user.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    await db.update(user).set(body).where(eq(user.id, userId));
    return new Response("Updated", { status: 200 });
  } catch (err) {
    console.error("Update error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
