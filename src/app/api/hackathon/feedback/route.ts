import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { hackathonFeedback } from "@/database/schema";
import { v4 as uuid } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract form fields
    const {
      name,
      email,
      phone,
      college,
      branch,
      year,
      overallRating,
      experienceRating,
      organizationRating,
      suggestions,
      venueRating,
      mentorshipRating,
    } = body;

    // Validation
    if (!name || !email || !phone || !college || !branch || !year) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Phone number must be 10 digits" },
        { status: 400 },
      );
    }

    // Validate ratings (1-5)
    if (
      !overallRating ||
      overallRating < 1 ||
      overallRating > 5 ||
      !experienceRating ||
      experienceRating < 1 ||
      experienceRating > 5 ||
      !organizationRating ||
      organizationRating < 1 ||
      organizationRating > 5
    ) {
      return NextResponse.json(
        { error: "Ratings must be between 1 and 5" },
        { status: 400 },
      );
    }

    // Insert into database
    const now = new Date();
    const feedbackId = uuid();

    await db.insert(hackathonFeedback).values({
      id: feedbackId,
      name,
      email,
      phone,
      college,
      branch,
      year,
      overallRating: Number(overallRating),
      experienceRating: Number(experienceRating),
      organizationRating: Number(organizationRating),
      whatYouLiked: null,
      improvements: null,
      suggestions: suggestions || null,
      wouldRecommend: false,
      venueRating: venueRating ? Number(venueRating) : null,
      foodRating: null,
      mentorshipRating: mentorshipRating ? Number(mentorshipRating) : null,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your feedback!",
        feedbackId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
