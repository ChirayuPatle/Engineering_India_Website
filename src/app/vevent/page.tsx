"use client";
import type { Event } from "@/context/eventContext";
import { getEvents } from "@/lib/event-mock-data";
import { useEffect, useState } from "react";
// import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowRight, Calendar, Loader2, MapPin, Users } from "lucide-react";
import Link from "next/link";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //   const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (err: any) {
        setError("Failed to load events.");
        // toast({
        //   title: 'Error',
        //   description: 'Could not load events. Please try again later.',
        //   variant: 'destructive',
        // });
        alert(`Error fetching events: ${err}`);
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-black" />
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error || events.length === 0) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            No Events Found
          </h2>
          <p className="mb-6 text-gray-600">
            {error || "There are no events available at this time."}
          </p>
          <Link href="/" className="text-black hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Discover Events
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Browse and register for upcoming events across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const startDate = new Date(event.start_date);
            const isUpcoming = startDate > new Date();

            return (
              <Card
                key={event.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-48">
                  <img
                    src={
                      event.image ||
                      event.gallery?.[0] ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                  {!isUpcoming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Badge className="bg-white px-4 py-1 text-sm text-black">
                        Event Ended
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    {isUpcoming && (
                      <Badge className="mb-2 bg-black text-white">
                        Upcoming
                      </Badge>
                    )}
                    <h2 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900">
                      {event.title}
                    </h2>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                      {event.description}
                    </p>

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          {format(new Date(event.start_date), "MMMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{event.spots_filled} registered</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {event.fee ? (
                          <span className="font-semibold text-black">
                            ₹{event.fee}
                          </span>
                        ) : (
                          <span className="font-semibold text-green-600">
                            Free
                          </span>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-white"
                        asChild
                      >
                        <Link href={`/vevent/${event.id}`}>
                          <span>View Details</span>
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
