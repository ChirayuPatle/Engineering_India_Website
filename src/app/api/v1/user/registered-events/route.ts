import envConfig from "@/config/envconfig";
import { database } from "@/libs/appwrite/config";
import { Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const registrations = await database.listDocuments(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteRegistrationCollectionID,
      [Query.equal("userId", userId)]
    );

    if (registrations.total === 0) {
      return NextResponse.json(
        { message: "User has not registered for any events" },
        { status: 404 }
      );
    }

    const eventIds = registrations.documents.map((reg) => reg.eventId);

    const events = await database.listDocuments(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteEventsCollectionID,
      [Query.equal("$id", eventIds)]
    );

    return NextResponse.json(
      {
        message: "Registered events fetched successfully",
        registrations: registrations.documents,
        events: events.documents,
        totalRegistrations: registrations.total,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching registered events:", error);
    return NextResponse.json(
      { error: "Failed to fetch registered events" },
      { status: 500 }
    );
  }
};
