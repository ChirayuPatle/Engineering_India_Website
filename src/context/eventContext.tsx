"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export type Event = {
  id: string;
  name: string;
  description?: string | null;
  startDate?: number | null;
  endDate?: number | null;
  timeline?: string | null;
  prizes?: string | null;
  faqs?: string | null;
  organizerContact?: string | null;
  coOrganizerContact?: string | null;
  discordLink?: string | null;
  whatsappLink?: string | null;
  bannerImage?: string | null;
  gallery?: string | null;
  details?: string | null;
  rules?: string | null;
  createdAt: number;
  updatedAt: number;
  location?: string | null;
  category?: string | null;
};

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const {
    data: events = [],
    isLoading: loading,
    error,
  } = useQuery<Event[]>({ 
    queryKey: ["events"],
    queryFn: async () => {
      const response = await api.get<Event[]>("/event");
      return response.data;
    },
  });

  return (
    <EventContext.Provider value={{ events, loading, error: error ? error.message : null }}>
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
