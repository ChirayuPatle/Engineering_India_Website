import { env } from "@/env";
import { createBrowserClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

export const createClient = () =>
  createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

export const supabase = createClient();

export const getUser = async () => {
  return await supabase.auth.getUser();
};
