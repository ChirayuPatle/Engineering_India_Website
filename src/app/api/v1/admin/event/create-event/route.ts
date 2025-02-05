import envConfig from "@/config/envconfig";
import { database } from "@/libs/appwrite/config";
import { ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body: EventType = await req.json();
    const {
      title,
      description,
      eventDate,
      registrationDeadline,
      location,
      imageUrl,
      category,
    } = body;

    const event = await database.createDocument(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteEventsCollectionID,
      ID.unique(),
      {
        title,
        description,
        eventDate,
        registrationDeadline,
        location,
        imageUrl,
        category,
      }
    );

    return NextResponse.json(
      { message: "Event Created Successfully", event },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
