// File: app/(auth)/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { env } from "@/env";

export async function loginWithGoogle() {
  const supabase = await createClient();
  const AUTH_CALLBACK_URL = `${env.NEXT_PUBLIC_BASE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: AUTH_CALLBACK_URL,
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    redirect("/error");
  }

  // revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signupWithGoogle() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logoutUser() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function getUser() {
  const supabase = await createClient();
  return supabase.auth.getUser();
}