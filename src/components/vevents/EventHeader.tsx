"use client";

import { format } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Event } from "@/context/eventContext";

interface EventHeaderProps {
  event: Event;
}

const EventHeader = ({ event }: EventHeaderProps) => {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date || "");
  const isUpcoming = startDate > new Date();

  const formatDate = (date: Date) => format(date, "MMMM d, yyyy");
  const formatTime = (date: Date) => format(date, "h:mm a");

  // Use the first gallery image or poster for the hero image
  const heroImage =
    event.gallery && event.gallery.length > 0 ? event.gallery[0] : event.image;

  return (
    <div className="animate-fade-in">
      {/* Full-width hero image */}
      {heroImage && (
        <div className="relative h-[40vh] w-full overflow-hidden md:h-[60vh]">
          <div className="absolute inset-0 z-10 bg-black/50" /> {/* Overlay */}
          <img
            src={heroImage}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="container mx-auto max-w-4xl">
              {isUpcoming && (
                <Badge className="mb-2 bg-black text-white">
                  Upcoming Event
                </Badge>
              )}
              <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
                {event.title}
              </h1>

              <div className="mb-4 flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(startDate)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formatTime(startDate)} - {formatTime(endDate)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event info card */}
      <div className="container relative z-20 mx-auto -mt-16 max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-lg bg-white p-6 shadow-lg md:flex-row">
          {/* Event image (smaller version) */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg md:w-1/3">
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="aspect-square h-auto w-full object-cover md:aspect-[4/3]"
              />
            ) : (
              <div className="flex h-48 w-full items-center justify-center bg-gray-200">
                <span className="font-medium text-gray-600">
                  No Image Available
                </span>
              </div>
            )}
          </div>

          {/* Event summary info */}
          <div className="w-full space-y-4 md:w-2/3">
            <div className="flex flex-wrap items-center gap-4">
              {event.fee ? (
                <Badge
                  variant="outline"
                  className="border-black px-3 py-1 text-lg text-black"
                >
                  ₹ {event.fee.toLocaleString()}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-green-500 px-3 py-1 text-lg text-green-500"
                >
                  Free
                </Badge>
              )}

              <div className="flex items-center gap-1">
                <span className="font-medium">{event.spots_filled}</span>
                <span className="text-gray-500">going</span>
              </div>
            </div>

            <p className="line-clamp-2 text-gray-600">
              {event.description.split("\n\n")[0]}
            </p>

            <div className="pt-2">
              <span className="text-sm text-gray-500">Organized by: </span>
              <span className="font-medium">
                {event?.organizer?.email || "Unknown Organizer"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
