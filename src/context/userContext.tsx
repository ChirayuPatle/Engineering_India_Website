"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { Loader } from "lucide-react";

const USER_CACHE_KEY = "user_cache";
const CACHE_EXPIRY = 1000 * 60 * 10; // 10 minutes

export type User = {
  id: string;
  email: string;
  name: string;
  image: string;
  lastUpdated?: number;
};

export interface UserEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  location: string;
  image?: string;
  attended: boolean;
}

export interface UserPayment {
  id: string;
  eventName: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "failed";
  transactionId: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  userEvents: UserEvent[];
  userPayments: UserPayment[];
  refreshUserEvents: () => Promise<void>;
  eventsLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [userPayments, setUserPayments] = useState<UserPayment[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  // Minimalistic caching for user data
  const saveUserToCache = useCallback((userData: User | null) => {
    try {
      if (userData) {
        const cacheData = { ...userData, lastUpdated: Date.now() };
        localStorage.setItem(USER_CACHE_KEY, JSON.stringify(cacheData));
      } else {
        localStorage.removeItem(USER_CACHE_KEY);
      }
    } catch (error) {
      console.error("Error saving user to cache:", error);
    }
  }, []);

  const loadUserFromCache = useCallback((): User | null => {
    try {
      const cached = localStorage.getItem(USER_CACHE_KEY);
      if (!cached) return null;
      const data: User = JSON.parse(cached);
      if (data.lastUpdated && Date.now() - data.lastUpdated > CACHE_EXPIRY) {
        localStorage.removeItem(USER_CACHE_KEY);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error loading user from cache:", error);
      return null;
    }
  }, []);

  // Fetch the user session from Supabase
  const fetchUserData = useCallback(async (): Promise<User | null> => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session?.user) return null;
      const { id, email, user_metadata } = session.user;
      return {
        id,
        email: email || "",
        name: user_metadata?.full_name || "",
        image: user_metadata?.avatar_url || "/default-avatar.png",
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }, []);

  // Refresh user data and update cache
  const refreshUser = useCallback(async () => {
    setLoading(true);
    const fetchedUser = await fetchUserData();
    if (fetchedUser) {
      setUser(fetchedUser);
      saveUserToCache(fetchedUser);
    } else {
      setUser(null);
      localStorage.removeItem(USER_CACHE_KEY);
      // Redirect to auth if on protected routes
      if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/profile") ||
        pathname.startsWith("/registration")
      ) {
        router.push("/auth");
      }
    }
    setLoading(false);
  }, [fetchUserData, saveUserToCache, pathname, router]);

  // Fetch user events and payments from Supabase
  const fetchUserEvents = useCallback(async (): Promise<{
    events: UserEvent[];
    payments: UserPayment[];
  }> => {
    if (!user) return { events: [], payments: [] };
    try {
      const { data: registrations, error } = await supabase
        .from("registrations")
        .select(
          `
          registration_id,
          registration_attended,
          registration_created_at,
          registration_ticket,
          events:registration_event_id (
            event_id,
            event_title,
            event_category,
            event_venue,
            event_start_date,
            event_image,
            registration_fee
          )
        `,
        )
        .eq("registration_user_id", user.id);
      if (error) throw error;

      const events: UserEvent[] = [];
      const payments: UserPayment[] = [];

      (registrations || []).forEach((registration: any) => {
        const eventData = registration.events;
        if (!eventData) return;
        events.push({
          id: eventData.event_id,
          title: eventData.event_title,
          date: new Date(eventData.event_start_date).toLocaleDateString(),
          time: new Date(eventData.event_start_date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          category: eventData.event_category,
          location: eventData.event_venue,
          image: eventData.event_image,
          attended: !!registration.registration_attended,
        });
        if (eventData.registration_fee > 0) {
          payments.push({
            id: registration.registration_id,
            eventName: eventData.event_title,
            amount: eventData.registration_fee,
            date: new Date(
              registration.registration_created_at,
            ).toLocaleDateString(),
            status: "paid",
            transactionId: registration.registration_ticket.substring(0, 8),
          });
        }
      });

      return { events, payments };
    } catch (error) {
      console.error("Error fetching user events:", error);
      return { events: [], payments: [] };
    }
  }, [user]);

  const refreshUserEvents = useCallback(async () => {
    setEventsLoading(true);
    const { events, payments } = await fetchUserEvents();
    setUserEvents(events);
    setUserPayments(payments);
    setEventsLoading(false);
  }, [fetchUserEvents]);

  // Logout function clears state and cache then redirects to home
  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setUserEvents([]);
      setUserPayments([]);
      localStorage.removeItem(USER_CACHE_KEY);
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [router]);

  // Update user profile (and local cache) without extra API calls
  const updateUserProfile = useCallback(
    async (updates: Partial<User>) => {
      setLoading(true);
      try {
        const { error } = await supabase.auth.updateUser({
          data: {
            full_name: updates.name,
            avatar_url: updates.image,
          },
        });
        if (error) throw error;
        if (user) {
          const updatedUser = { ...user, ...updates };
          setUser(updatedUser);
          saveUserToCache(updatedUser);
        }
      } catch (error) {
        console.error("Error updating user profile:", error);
      } finally {
        setLoading(false);
      }
    },
    [user, saveUserToCache],
  );

  // Initialize user (load cache then refresh in background)
  useEffect(() => {
    const cachedUser = loadUserFromCache();
    if (cachedUser) {
      setUser(cachedUser);
      setLoading(false);
      refreshUserEvents();
      refreshUser(); // refresh user data in background
    } else {
      refreshUser();
      refreshUserEvents();
    }
    // Run this effect only once on mount to avoid infinite loops.
  }, []); // <<== Empty dependency array

  // Listen for auth state changes and update accordingly
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (["SIGNED_IN", "TOKEN_REFRESHED", "USER_UPDATED"].includes(event)) {
          refreshUser();
          refreshUserEvents();
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setUserEvents([]);
          setUserPayments([]);
          localStorage.removeItem(USER_CACHE_KEY);
          if (
            pathname.startsWith("/dashboard") ||
            pathname.startsWith("/profile") ||
            pathname.startsWith("/registration")
          ) {
            router.push("/auth");
          }
        }
      },
    );
    return () => listener.subscription.unsubscribe();
  }, [refreshUser, refreshUserEvents, pathname, router]);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      refreshUser,
      logout,
      updateUserProfile,
      userEvents,
      userPayments,
      refreshUserEvents,
      eventsLoading,
    }),
    [
      user,
      loading,
      refreshUser,
      logout,
      updateUserProfile,
      userEvents,
      userPayments,
      refreshUserEvents,
      eventsLoading,
    ],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
