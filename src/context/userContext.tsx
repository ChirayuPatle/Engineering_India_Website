"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    async function fetchUser() {
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
        router.push("/auth");
      }
      setLoading(false);
    }

    fetchUser();
  }, [router]);

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
