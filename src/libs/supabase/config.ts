import { createClient } from "@supabase/supabase-js";
import envConfig from "@/config/envconfig";

export const supabase = createClient(
  envConfig.supabaseEndpoint,
  envConfig.supabaseAnonKey
);

export const signInWithGoogle = async () => {
  try {
    const response = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/admin",
      },
    });

    if (response.error) throw response.error;

    return response;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return;
  }
};
