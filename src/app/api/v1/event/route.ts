import envConfig from "@/config/envconfig";
import { database } from "@/libs/appwrite/config";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const events = await database.listDocuments(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteEventsCollectionID
    );

    return NextResponse.json(
      { message: "Events fetched successfully", events: events.documents },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
};
