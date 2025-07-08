"use client";

import { EventCard } from "@/components/events/eventCard";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useEvents } from "@/context/eventContext";
import { Search, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function EventCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export default function EventsPage() {
  const { events, loading, error } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory] = useState("all");

  const categories = ["All", ...new Set(events.map((event) => event.category))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
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

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-400 bg-red-50 p-6 text-center text-red-700 shadow-sm">
          <TriangleAlert className="mb-4 h-12 w-12 text-red-500" />
          <span className="text-xl font-semibold">Error loading events.</span>
          <p className="mt-2 text-sm">
            We couldn't load the events. Please try again later.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="hover:opacity-90"
              >
                <EventCard
                  title={event.name}
                  date={new Date(event.startDate || Date.now())}
                  location={event.location || ""}
                  description={event.description || ""}
                  imageUrl={event.bannerImage?.trim() || "./notfound.svg"}
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
