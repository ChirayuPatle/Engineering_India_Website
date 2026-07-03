// app/api/feedback/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { feedback } from "@/database/schema";
import { and, eq, gte } from "drizzle-orm";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedBody = feedbackSchema.parse(body);
    const { name, email, message } = validatedBody;

    // 1. Check if user already gave feedback in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const existingFeedback = await db.query.feedback.findFirst({
      where: and(
        eq(feedback.email, email),
        gte(feedback.createdAt, thirtyDaysAgo),
      ),
    });

    if (existingFeedback) {
      return NextResponse.json(
        {
          message:
            "You have already submitted feedback recently. Please try again later.",
        },
        { status: 429 },
      );
    }

    // 2. Insert new feedback
    await db.insert(feedback).values({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully!",
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: err.issues },
        { status: 400 },
      );
    }
    console.error(err);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
