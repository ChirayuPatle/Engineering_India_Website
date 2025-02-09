const envConfig = {
  // Base
  appwriteEndpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),

  // Database
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),

  // Collections
  appwriteUserCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID
  ),
  appwriteEventsCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_EVENT_COLLECTION_ID
  ),
  appwriteRegistrationCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_REGISTRATION_COLLECTION_ID
  ),
  appwriteFeedbackCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID
  ),
  baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
};

export default envConfig;
