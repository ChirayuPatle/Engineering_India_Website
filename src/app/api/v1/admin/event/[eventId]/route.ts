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

export const GET = async (
  req: NextRequest,
  context: { params: { eventId: string } }
) => {
  try {
    const { eventId } = context.params;

    const registrations = await database.listDocuments(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteRegistrationCollectionID,
      [Query.equal("eventId", eventId)]
    );

    return NextResponse.json(
      {
        message: "Registration count retrieved successfully",
        totalRegistrations: registrations.total,
        registrations: registrations.documents,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get registration count" },
      { status: 500 }
    );
  }
};
