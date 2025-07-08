"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Share2 as Share2Icon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import events from "@/event-grallery";
import Image from "next/image";

interface EventHeaderProps {
  event: {
    event_title: string;
    event_start_date: string;
    event_venue: string;
    event_id: string;
    event_image?: string;
    registration_fee?: number | null;
    event_description: string;
    co_organized_by?: string;
    organized_by?: string;
  };
}

export default function EventHeader({ event }: EventHeaderProps) {
  const [gallery, setGallery] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  const startDate = new Date(event.event_start_date);
  const isValidDate = !isNaN(startDate.getTime());
  const formatDate = (date: Date) => format(date, "MMMM d, yyyy");

  useEffect(() => {
    const selectedEvent = events.find((e) => e.id === event.event_id);
    if (selectedEvent) {
      setGallery(selectedEvent.images || []);
    }
  }, [event.event_id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        gallery.length > 0 ? (prevIndex + 1) % gallery.length : 0,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [gallery]);

  return (
    <div className="animate-fade-in">
      <div className="relative h-[40vh] w-full overflow-hidden md:h-[60vh]">
        {gallery.length > 0 ? (
          <Image
            src={
              gallery[currentImageIndex] ??
              event.event_image ??
              "/placeholder-image.jpg"
            }
            alt="Event Gallery Image"
            fill
            className="h-full w-full object-cover transition-opacity duration-500 ease-in-out"
            priority
          />
        ) : (
          <Image
            src={event.event_image ?? "/placeholder-image.jpg"}
            alt="Event Image"
            fill
            className="h-full w-full object-cover transition-opacity duration-500 ease-in-out"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-4 z-30 flex items-center gap-2 rounded-md bg-white p-2 shadow transition-colors hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <div className="container mx-auto flex max-w-4xl flex-col text-center">
            <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-6xl">
              {event.event_title}
            </h1>
            <div className="mb-4 flex max-w-lg items-center justify-center gap-4 self-center rounded-md bg-white p-2 px-3 shadow md:px-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {isValidDate ? formatDate(startDate) : "N/A"}
                </span>
              </div>
              <div className="h-4 border-l border-gray-300"></div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-xs">{event.event_venue}</span>
              </div>
              <Button
                variant="ghost"
                onClick={async () => {
                  await navigator.share({
                    title: event.event_title,
                    text: "Look this exciting event",
                    url: window.location.href,
                  });
                }}
                className="flex items-center gap-1 p-2 text-black"
              >
                <Share2Icon className="h-4 w-4" />
                <span className="hidden text-sm sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container relative z-20 mx-auto -mt-8 max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-lg border border-zinc-200 bg-white p-6 md:flex-row">
          <div className="relative w-full overflow-hidden rounded-lg border border-zinc-300 md:w-1/3">
            <Image
              src={event.event_image ?? "/placeholder-image.jpg"}
              alt={event.event_title}
              fill
              className="aspect-square h-auto w-full object-cover md:aspect-[4/3]"
              priority
            />
          </div>
          <div className="w-full space-y-4 md:w-2/3">
            <div className="flex flex-wrap items-center gap-4">
              {event.registration_fee ? (
                <Badge
                  variant="outline"
                  className="border-orange-500 px-3 py-1 text-lg text-orange-500"
                >
                  Paid
                </Badge>
              ) : (
                // <Badge
                //   variant="outline"
                //   className="border-black px-3 py-1 text-lg text-black"
                // >
                //   ₹ {event.registration_fee.toLocaleString()}
                // </Badge>
                <Badge
                  variant="outline"
                  className="border-green-500 px-3 py-1 text-lg text-green-500"
                >
                  Free
                </Badge>
              )}
            </div>
            <p className="line-clamp-2 text-gray-600">
              {(event.event_description || "").split("\n\n")[0]}
            </p>
            <div className="pt-2">
              <span className="flex gap-1 text-sm">
                Organized by:
                {event.organized_by ? (
                  <h1 className="font-bold">{event.organized_by}</h1>
                ) : (
                  <h1 className="font-bold">Team EI</h1>
                )}
              </span>
              <br />
              <span className="flex gap-1 text-sm">
                {event.co_organized_by && (
                  <>
                    Co-Organized by:
                    <h1 className="font-bold">{event.co_organized_by}</h1>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
