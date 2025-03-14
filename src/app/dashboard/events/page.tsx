"use client";

import { EventCard } from "@/components/events/eventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useEvents } from "@/context/eventContext";
import { useRouter } from "next/navigation";

const categories = ["All", "Tech Talk", "Workshop", "Networking", "Hackathon"];

export default function EventsPage() {
  const { events, loading, error } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.event_title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.event_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const router = useRouter();

  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
      </div>
      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div>Error loading events: {error}</div>
      ) : (
        <>
          <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Link
                key={event.event_id}
                href={`/events/${event.event_id}`}
                className="hover:opacity-90"
              >
                <EventCard
                  title={event.event_title}
                  date={event.event_start_date}
                  location={event.event_venue}
                  description={event.event_description}
                  imageUrl={event.event_image?.trim() || "./notfound.svg"}
                  category={event.event_category}
                  href={`/events/${event.event_id}`}
                />
              </Link>
            ))}
          </div>
          {filteredEvents.length === 0 && (
            <div className="mt-12 text-center">
              <Typography variant="h3" className="text-muted-foreground">
                No events found
              </Typography>
            </div>
          )}
        </>
      )}
    </main>
  );
}
