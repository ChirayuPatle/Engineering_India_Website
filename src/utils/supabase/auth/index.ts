import { supabase } from "../client";
import { type User } from "@supabase/supabase-js";

export interface AuthError {
  message: string;
  status: number;
}

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

export const auth = {
  async loginWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return {
        user: data.user,
        error: null,
      };
    } catch (error: any) {
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status,
        },
      };
    }
  },

  async registerWithEmail(
    email: string,
    password: string,
    name: string,
  ): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      return {
        user: data.user,
        error: null,
      };
    } catch (error: any) {
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status,
        },
      };
    }
  },

  // Login with Google
  async loginWithGoogle(): Promise<void> {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  },

  // Logout
  async logout(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return { error: null };
    } catch (error: any) {
      return {
        error: {
          message: error.message,
          status: error.status,
        },
      };
    }
  },

  // Get current user
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      return {
        user,
        error: null,
      };
    } catch (error: any) {
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status,
        },
      };
    }
  },

  // Get session
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    return { session, error };
  },
};
