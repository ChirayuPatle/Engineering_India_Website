export const dynamic = "force-dynamic";

import envConfig from "@/config/envconfig";
import { database } from "@/libs/appwrite/config";
import { Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  context: { params: { eventId: string } }
) => {
  try {
    const { eventId } = context.params;
    const body = await req.json();

    const updatedEvent = await database.updateDocument(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteEventsCollectionID,
      eventId,
      body
    );

    return NextResponse.json(
      { message: "Event updated successfully", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  context: { params: { eventId: string } }
) => {
  try {
    const { eventId } = context.params;

    await database.deleteDocument(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteEventsCollectionID,
      eventId
    );

    return NextResponse.json({
      message: "Event deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ eventId: string }> } // note: params is awaited
) {
  try {
    // Await the params to get eventId
    const { eventId } = await context.params;

    // Option 1: Use getDocument to fetch the single event document by its id
    const event = await database.getDocument(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteEventsCollectionID,
      eventId
    );

    return NextResponse.json(
      {
        message: "Successfully retrieved the event",
        event,
      },
      { status: 200 }
    );

    /* 
    // Option 2: Alternatively, if you prefer to use listDocuments with a query:
    import { Query } from "appwrite";
    const result = await database.listDocuments(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteEventsCollectionID,
      [Query.equal("$id", eventId)]
    );
    // Assuming the document exists, result.documents[0] is your event
    return NextResponse.json(
      {
        message: "Successfully retrieved the event",
        event: result.documents[0],
      },
      { status: 200 }
    );
    */
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to retrieve the event" },
      { status: 500 }
    );
  }
}
