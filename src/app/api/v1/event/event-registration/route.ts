import envConfig from "@/config/envconfig";
import { database } from "@/libs/appwrite/config";
import { ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body: EventRegistrationType = await req.json();
    const { userEmail, userName, mobileNumber, userId, qrLink } = body;

    const registration = await database.createDocument(
      envConfig.appwriteDatabaseId,
      envConfig.appwriteRegistrationCollectionID,
      ID.unique(),
      {
        userEmail,
        userName,
        status: "pending",
        qrLink: qrLink || "",
        mobileNumber,
        userId,
      }
    );

    return NextResponse.json(
      { message: "Registration Created Successfully", registration },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
