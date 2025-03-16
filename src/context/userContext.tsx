"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import { supabase } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";

export type User = {
  id: string;
  email: string;
  name: string;
  image: string;
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // List of protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/registration"];

  useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error);
        }

        if (session?.user) {
          const { id, email, user_metadata } = session.user;
          const name = user_metadata.full_name || "";
          const image = user_metadata.avatar_url || "/default-avatar.png";
          if (email) {
            setUser({ email, name, image, id });
          }
        } else {
          setUser(null);

          // Only redirect to auth if the user is on a protected route
          const isProtectedRoute = protectedRoutes.some((route) =>
            pathname?.startsWith(route),
          );

          if (isProtectedRoute) {
            router.push("/auth");
          }
        }
      } catch (error) {
        console.error("Error in fetchUser:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { id, email, user_metadata } = session.user;
          const name = user_metadata.full_name || "";
          const image = user_metadata.avatar_url || "/default-avatar.png";
          if (email) {
            setUser({ email, name, image, id });
          }
        } else {
          setUser(null);
<<<<<<< HEAD

          // Only redirect to auth if the user is on a protected route
          const isProtectedRoute = protectedRoutes.some((route) =>
            pathname?.startsWith(route),
          );

          if (isProtectedRoute) {
=======
          setUserEvents([]);
          setUserPayments([]);
          localStorage.removeItem(USER_CACHE_KEY);
          if (
            pathname.startsWith("/dashboard") ||
            pathname.startsWith("/profile") ||
            pathname.startsWith("/registration") ||
            pathname.endsWith("/register") ||
            pathname.endsWith("/ticket")
          ) {
>>>>>>> 892e0df (fix: linting issues)
            router.push("/auth");
          }
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, pathname]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
