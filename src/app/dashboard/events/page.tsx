"use client";

import { EventCard } from "@/components/dashboard/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEvents } from "@/context/eventContext";

export default function EventsPage() {
  const router = useRouter();
  const { events, loading, error } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.event_title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.event_category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = (id: string) => {
    console.info(`User registered for event with ID: ${id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Club Events
        </h1>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={(value) => setCategoryFilter(value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Workshop">Workshop</SelectItem>
            <SelectItem value="Competition">Competition</SelectItem>
            <SelectItem value="Study">Study</SelectItem>
            <SelectItem value="Career">Career</SelectItem>
            <SelectItem value="Seminar">Seminar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div>Error loading events: {error}</div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.event_id}
                id={event.event_id}
                title={event.event_title}
                description={event.event_description}
                start_date={event.event_start_date}
                end_date={event.event_end_date}
                venue={event.event_venue}
                category={event.event_category}
                spots={event.event_spots}
                spotsFilled={event.event_spots_filled}
                price={event.registration_fee}
                isRegistered={event.isRegistered}
                onRegister={handleRegister}
                image={event.event_image}
              />
            ))}
          </div>
          {filteredEvents.length === 0 && (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
              <div className="flex flex-col items-center text-center">
                <h3 className="mt-2 text-xl font-semibold">No events found</h3>
                <p className="text-sm text-muted-foreground">
                  Try changing your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
