"use client";

console.log("*** EventsPage component is rendering! ***");

import { EventCard } from "@/components/events/eventCard";
import { Typography } from "@/components/ui/typography";
import { useEvents } from "@/context/eventContext";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

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

  console.log(events);

  return (
    <main className="container mx-auto mt-[3rem] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <Typography variant="h1" className="mb-6">
          Our Events
        </Typography>
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
            {/* Hardcoded Hackathon 2025 Event */}
            <Link href="/events/hackathon" className="hover:opacity-90">
              <EventCard
                title="HACKATHON 2025"
                date={new Date("2025-11-01")}
                location="YCCE, Nagpur"
                description="Unleash your creativity and technical prowess in our flagship 24-hour hackathon! Build innovative solutions, collaborate with talented developers, and compete for exciting prizes."
                imageUrl="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpfeU5o0XrTM2A4iGtHSU9JzXjlhanE7L0yQkV"
              />
            </Link>

            {/* Dynamic events from database */}
            {events.map((event) => (
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

          {events.length === 0 && (
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
