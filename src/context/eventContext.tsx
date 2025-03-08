"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import { supabase } from "@/utils/supabase/client";

export type Event = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  venue: string;
  category: string;
  spots: number;
  spots_filled: number;
  price: number;
  isRegistered?: boolean;
  onRegister?: (id: string) => void;
  image?: string;
};

interface EventContextType {
  events: Event[];
  setEvents: (events: Event[]) => void;
  loading: boolean;
  error: string | null;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) {
        console.error("Error fetching events:", error.message);
        setError(error.message);
      } else if (data) {
        setEvents(data as Event[]);
      }
      setLoading(false);
    }

    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, setEvents, loading, error }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
}
