"use client";

import { EventCard } from "@/components/events/eventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useEvents } from "@/context/eventContext";

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

  return (
    <main className="container mx-auto mt-[3rem] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <Typography variant="h1" className="mb-6">
          Our Events
        </Typography>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div> */}
        </div>
      </div>

      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div>Error loading events: {error}</div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Link
                key={event.event_id}
                href={`/events/${event.event_id}`}
                className="hover:opacity-90"
              >
                <EventCard
                  title={event.event_title}
                  date={new Date(event.event_start_date)}
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
