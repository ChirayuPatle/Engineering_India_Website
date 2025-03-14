"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Link2,
  Share2 as Share2Icon,
  X,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { type Event } from "@/context/eventContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EventHeaderProps {
  event: Event;
}

const dummyGallery = [
  "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523475496153-3d6cc3d4d9d8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
];

export default function EventHeader({ event }: EventHeaderProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const router = useRouter();

  const startDate = new Date(event.event_start_date);
  const isUpcoming = startDate > new Date();
  const formatDate = (date: Date) => format(date, "MMMM d, yyyy");

  const heroImage =
    event.gallery && event.gallery.length > 0
      ? event.gallery[0]
      : event.event_image ||
        "https://drive.google.com/file/d/1SX3OrRZBdMPAICBEB9TLSp6rTRKDOoJT/view?usp=drive_link";

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShareButtonClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check this out!",
          text: "I found this interesting event, have a look!",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      toast.error("Web Share API is not supported in your browser.");
      console.error("Web Share API is not supported in your browser.");
    }
  };

  const galleryImages =
    event.gallery && event.gallery.length > 0 ? event.gallery : dummyGallery;

  return (
    <div className="animate-fade-in">
      {/* HERO SECTION */}
      <div className="relative h-[40vh] w-full md:h-[60vh]">
        <img
          src={heroImage}
          alt={event.event_title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Updated Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute left-4 top-4 z-30 flex items-center gap-2 rounded-md bg-white p-2 shadow transition-colors hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col items-center justify-center">
              <h1 className="mb-4 text-center text-5xl font-extrabold text-white sm:text-6xl">
                {event.event_title}
              </h1>
              <div className="mb-4 flex items-center gap-4 rounded-md bg-white p-1 px-2 shadow">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">
                    {formatDate(startDate)}
                  </span>
                </div>
                <div className="h-4 border-l border-gray-300"></div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">
                    {event.event_venue}
                  </span>
                </div>
                <div className="h-4 border-l border-gray-300"></div>
                <Button
                  variant="ghost"
                  onClick={handleShareButtonClick}
                  className="flex items-center gap-1 p-2 text-black"
                >
                  <Share2Icon className="h-4 w-4" />
                  <span className="hidden text-xs sm:inline sm:text-sm">
                    Share
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="container relative z-20 mx-auto -mt-8 max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-lg border border-zinc-200 bg-white p-6 md:flex-row">
          <div className="w-full overflow-hidden rounded-lg border border-zinc-300 md:w-1/3">
            <img
              src={
                event.event_image ||
                "https://images.unsplash.com/photo-1735342623457-b683e0ba1c2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              }
              alt={event.event_title}
              className="aspect-square h-auto w-full object-cover md:aspect-[4/3]"
            />
          </div>
          <div className="w-full space-y-4 md:w-2/3">
            <div className="flex flex-wrap items-center gap-4">
              {event.registration_fee ? (
                <Badge
                  variant="outline"
                  className="border-black px-3 py-1 text-lg text-black"
                >
                  ₹ {event.registration_fee.toLocaleString()}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-green-500 px-3 py-1 text-lg text-green-500"
                >
                  Free
                </Badge>
              )}
              {/* TODO: We want to show the actual numbers or not  */}
              {/* <div className="flex items-center gap-1">
                <span className="font-medium">{event.event_spots_filled}</span>
                <span className="text-gray-500">going</span>
              </div> */}
            </div>
            <p className="line-clamp-2 text-gray-600">
              {event.event_description.split("\n\n")[0]}
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
}
