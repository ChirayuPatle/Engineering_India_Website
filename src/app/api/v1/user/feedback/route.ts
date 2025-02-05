import envConfig from "@/config/envconfig";
import { database } from "@/libs/appwrite/config";
import { ID, Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export type FeedbackType = "comments" | "suggestions" | "questions";

interface FeedbackRequest {
  feedbackType: FeedbackType;
  description: string;
  name: string;
  email: string;
  userId: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as FeedbackRequest;
    const { feedbackType, description, name, email, userId } = body;

    if (!feedbackType || !description || !name || !email || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["comments", "suggestions", "questions"].includes(feedbackType)) {
      return NextResponse.json(
        { error: "Invalid feedback type" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const feedback = await database.createDocument(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteFeedbackCollectionID,
      ID.unique(),
      {
        feedbackType,
        description: description.trim(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        userId,
      }
    );

    return NextResponse.json(
      {
        message: "Feedback submitted successfully",
        feedback,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const feedback = await database.listDocuments(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteFeedbackCollectionID,
        [Query.equal("userId", userId)]
      );
      return NextResponse.json(feedback, { status: 200 });
    }

    const allFeedback = await database.listDocuments(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteFeedbackCollectionID
    );
    return NextResponse.json(allFeedback, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
};
