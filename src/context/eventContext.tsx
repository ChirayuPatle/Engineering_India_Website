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
  event_id: string;
  event_title: string;
  registration_fee: number;
  event_description: string;
  event_start_date: string;
  event_end_date?: string;
  // New fields added:
  registration_opens: string;
  registration_closes: string;
  event_venue: string;
  event_category: string;
  event_spots: number;
  event_spots_filled: number;
  prizes?: {
    prize_position: string;
    prize_description?: string;
    prize_value?: string;
  }[];
  isRegistered?: boolean;
  onRegister?: (id: string) => void;
  event_image?: string;
  organizer?: {
    name: string;
    email: string;
    phone: string;
  };
  faqs?: {
    faq_question: string;
    faq_answer: string;
  }[];
  gallery?: string[];
  event_registration_mode: "INDIVIDUAL" | "TEAM";
  schedule?: {
    schedule_time: string;
    schedule_activity: string;
    schedule_location?: string;
    schedule_speakers?: string[];
  }[];
  event_tags?: string[];
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
        .order("event_created_at", { ascending: true });
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
