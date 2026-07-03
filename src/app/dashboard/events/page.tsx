"use client";

import { EventCard } from "@/components/events/eventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  TriangleAlert,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEvents } from "@/context/eventContext";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
  const router = useRouter();
  const { events, loading, error } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          {/* Featured Event: HACKATHON 2025 */}
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-black" />
              <h2 className="text-xl font-bold text-gray-900">
                Featured Event
              </h2>
              <Badge className="bg-black hover:bg-gray-900">LIVE</Badge>
            </div>

            <Link href="/events/hackathon" className="block">
              <div className="group relative overflow-hidden rounded-xl border-2 border-black bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-lg transition-all hover:shadow-xl">
                {/* Background Pattern */}
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
                  <div className="absolute right-4 top-4 text-8xl">🏆</div>
                </div>

                <div className="relative">
                  {/* Badge */}
                  <Badge className="mb-3 border-0 bg-black text-white hover:bg-gray-900">
                    Hackathon • Competition
                  </Badge>

                  {/* Title */}
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                    HACKATHON 2025
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-gray-700 md:text-base">
                    Two-round hackathon with exciting problem statements across
                    FinTech, EdTech, AI & Blockchain, and more. Prize pool worth
                    ₹13,000 + Internship opportunities!
                  </p>

                  {/* Event Details Grid */}
                  <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-xs text-gray-600">Event Date</p>
                      <p className="text-sm font-bold text-gray-900">
                        Nov 01, 2025
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="text-sm font-bold text-gray-900">
                        YCCE, Nagpur
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-xs text-gray-600">Entry Fee</p>
                      <p className="text-sm font-bold text-gray-900">
                        ₹300/team
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-xs text-gray-600">Prize Pool</p>
                      <p className="text-sm font-bold text-black">₹13,000</p>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="border-black text-gray-900"
                    >
                      2-4 Members/Team
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-black text-gray-900"
                    >
                      Multiple Tracks
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-black text-gray-900"
                    >
                      2 Rounds
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-black text-gray-900"
                    >
                      Internship Offers
                    </Badge>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center gap-3">
                    <Button
                      className="bg-black font-semibold text-white shadow-md hover:bg-gray-900"
                      asChild
                    >
                      <span className="flex items-center gap-2">
                        View Details & Register
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                    <p className="text-xs text-gray-600">
                      Registration Deadline:{" "}
                      <span className="font-semibold text-black">
                        Oct 29, 2025
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <p className="text-sm font-semibold text-gray-600">
              Other Club Events
            </p>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
