const envConfig = {
  appwriteEndpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  supabaseAnonKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  supabaseEndpoint: String(process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT),
  supabaseBucketEndpoint: String(
    process.env.NEXT_PUBLIC_SUPABASE_BUCKET_ENDPOINT
  ),
  supabaseBucketRegion: String(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_REGION),
  supabaseAccessKey: String(process.env.NEXT_PUBLIC_SUPABASE_ACCESS_KEY),
  supabaseSecretAccessKey: String(
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_ACCESS_KEY
  ),
};

export default envConfig;
