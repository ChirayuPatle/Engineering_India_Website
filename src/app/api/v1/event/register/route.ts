import envConfig from "@/config/envconfig";
import { database } from "@/libs/appwrite/config";
import { ID, Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body: EventRegistrationType = await req.json();
    const { userEmail, userName, mobileNumber, userId, qrLink, eventId } = body;

    if (!userEmail || !userName || !mobileNumber || !userId || !eventId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(String(mobileNumber))) {
      return NextResponse.json(
        { error: "Invalid mobile number format" },
        { status: 400 }
      );
    }

    const registration = await database.createDocument(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteRegistrationCollectionID,
      ID.unique(),
      {
        userEmail: userEmail.toLowerCase().trim(),
        userName: userName.trim(),
        status: "pending",
        qrLink: qrLink?.trim() || "",
        mobileNumber,
        userId,
        eventId,
      }
    );

    return NextResponse.json(
      {
        message: "Registration Created Successfully",
        registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Registration failed",
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    // http://url?eventId=anyEventID
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { error: "eventId is required" },
        { status: 400 }
      );
    }

    const registrations = await database.listDocuments(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteRegistrationCollectionID,
      [Query.equal("eventId", eventId)]
    );

    return NextResponse.json(
      {
        count: registrations.total,
        message: "Registration count retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch registration count" },
      { status: 500 }
    );
  }
};
