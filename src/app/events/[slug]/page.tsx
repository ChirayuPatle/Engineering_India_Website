"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useEvents } from "@/context/eventContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import {
  Link2,
  Linkedin,
  MessageCircleMore,
  Share2 as Share2Icon,
  Twitter,
} from "lucide-react";
import EventHeader from "@/components/events/EventHeader";

function BlurImage(props: any) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      {...props}
      className={`${props.className} transition duration-700 ease-in-out ${
        isLoading ? "blur-2xl" : "blur-0"
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}

function AutoCarousel({
  images,
  interval = 3000,
  className = "",
}: {
  images: string[];
  interval?: number;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className={`relative ${className}`}>
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <BlurImage
            src={img}
            alt="Carousel Image"
            fill
            style={{ objectFit: "cover" }}
            priority={index === currentIndex}
          />
        </div>
      ))}
    </div>
  );
}

export function ShareModal({
  isOpen,
  onClose,
  shareUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}) {
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="w-80 rounded-lg bg-white p-6">
        <h3 className="mb-4 text-lg font-bold">Share Event</h3>
        <div className="flex flex-col gap-3">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border p-2 hover:bg-gray-100"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border p-2 hover:bg-gray-100"
          >
            <Twitter className="h-5 w-5" />
            Twitter
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border p-2 hover:bg-gray-100"
          >
            <MessageCircleMore className="h-5 w-5" />
            WhatsApp
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              onClose();
            }}
            className="flex items-center gap-2 rounded border p-2 hover:bg-gray-100"
          >
            <Link2 className="h-5 w-5" />
            Copy Link
          </button>
        </div>
        <Button variant="default" className="mt-4 w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex h-screen backdrop-blur-md bg-white/10 w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-black" />
    </div>
  );
}

// Helper function to format remaining time as HH:MM:SS
function formatTimeLeft(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export default function EventPage() {
  const router = useRouter();
  const { slug } = useParams();
  const { events } = useEvents();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const handleScrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Update timer based on event.registration_closes
  useEffect(() => {
    if (!events || events.length === 0) return;
    const eventFound = events.find((ev) => ev.event_id === slug);
    if (!eventFound) return;
    const regClose = new Date(eventFound.registration_closes);
    const updateTime = () => {
      const diff = regClose.getTime() - new Date().getTime();
      setTimeLeft(diff);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [events, slug]);

  if (!events || events.length === 0) {
    return <Spinner />;
  }

  // Updated lookup using event_id from your event type
  const event = events.find((ev) => ev.event_id === slug);
  if (!event) {
    return (
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <Typography variant="h1" className="mb-6">
            Event Not Found
          </Typography>
          <Typography className="mb-8 text-muted-foreground">
            The event you're looking for doesn't exist or has been removed.
          </Typography>
          <Button>
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </main>
    );
  }

  // Prepare images for the carousel using gallery if available
  const images = Array.isArray(event.gallery)
    ? event.gallery
    : [event.event_image ?? "./notfound.svg"];
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // Dynamic nav items based on event data using new schema fields
  const navItems = [
    { id: "overview", label: "Overview", condition: true },
    {
      id: "prizes",
      label: "Prizes",
      condition: event.prizes && event.prizes.length > 0,
    },
    {
      id: "schedule",
      label: "Schedule",
      condition: event.schedule && event.schedule.length > 0,
    },
    {
      id: "team",
      label: "Team",
      condition: event.event_registration_mode === "TEAM",
    },
    {
      id: "gallery",
      label: "Gallery",
      condition: event.gallery && event.gallery.length > 0,
    },
    {
      id: "faq",
      label: "FAQ",
      condition: event.faqs && event.faqs.length > 0,
    },
  ];

  return (
    <>
      <EventHeader event={event} />

      <main className="container mx-auto px-4 py-16 sm:px-6 sm:py-8 lg:px-36">
        <nav className="sticky top-0 z-30 mb-8 border-b border-zinc-900/20 bg-white py-4">
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) =>
              item.condition ? (
                <Button
                  key={item.id}
                  variant="outline"
                  onClick={() => handleScrollTo(item.id)}
                >
                  {item.label}
                </Button>
              ) : null
            )}
          </div>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {event.event_description && (
              <section id="overview" className="scroll-mt-20 space-y-6">
                <Card className="p-6 shadow-none">
                  <Typography as="h2" className="mb-4 text-2xl font-bold">
                    About the Event
                  </Typography>
                  <div className="prose max-w-none whitespace-pre-line">
                    {event.event_description}
                  </div>
                </Card>
              </section>
            )}

            {event.prizes && event.prizes.length > 0 && (
              <section id="prizes" className="scroll-mt-20 space-y-6">
                <Typography as="h1" className="text-2xl font-bold">
                  Prizes
                </Typography>
                {/* Insert your PrizeGrid or other components */}
              </section>
            )}

            {event.schedule && event.schedule.length > 0 && (
              <section id="schedule" className="scroll-mt-20 space-y-6">
                <Typography as="h1" className="text-2xl font-bold">
                  Timeline and Schedule
                </Typography>
                {/* Insert your Timeline or other components */}
              </section>
            )}

            {event.event_registration_mode === "TEAM" && (
              <section id="team" className="scroll-mt-20 space-y-6">
                <Typography as="h1" className="text-2xl font-bold">
                  Registered Teams
                </Typography>
                {/* Insert your TeamGrid or other components */}
              </section>
            )}

            {event.gallery && event.gallery.length > 0 && (
              <section id="gallery" className="scroll-mt-20 space-y-6">
                <Typography as="h1" className="text-2xl font-bold">
                  Gallery
                </Typography>
                {/* Insert your EventGallery or other components */}
              </section>
            )}

            {event.faqs && event.faqs.length > 0 && (
              <section id="faq" className="scroll-mt-20 space-y-6">
                <Typography as="h1" className="text-2xl font-bold">
                  FAQs
                </Typography>
                {/* Insert your FAQAccordion or other components */}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="sticky top-20 z-20 w-full space-y-6 lg:w-[300px] lg:self-start">
            <Card className="p-4 shadow-none">
              <div className="mb-4 flex items-center justify-between">
                <Typography as="h2" className="text-xl font-bold">
                  {timeLeft > 0 ? "Register Now 🚀" : "Event Ended 🥺"}
                </Typography>
              </div>
              <Button
                type="button"
                onClick={() => timeLeft > 0 && router.push("/registration")}
                className={`w-full ${timeLeft > 0 ? "bg-black": "bg-red-300 hover:bg-red-300 "} `}
              >
                {timeLeft > 0
                  ? `Register Now (${formatTimeLeft(timeLeft)})`
                  : "Registration Closed"}
              </Button>
            </Card>

            <Card className="p-4 shadow-none">
              <Typography as="h3" className="mb-2 font-semibold">
                Important Dates
              </Typography>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Registration Opens</span>
                  <span>{event.registration_opens}</span>
                </li>
                <li className="flex justify-between">
                  <span>Registration Closes</span>
                  <span>{event.registration_closes}</span>
                </li>
                <li className="flex justify-between">
                  <span>Event Starts</span>
                  <span>{event.event_start_date}</span>
                </li>
                <li className="flex justify-between">
                  <span>Event Ends</span>
                  <span>{event.event_end_date ?? event.event_start_date}</span>
                </li>
              </ul>
            </Card>

            <Card className="p-4 shadow-none">
              <Typography as="h3" className="mb-2 font-semibold">
                Contact Organizers
              </Typography>
              <div className="space-y-2 text-sm">
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="w-full shadow-none">
                    Whatsapp
                  </Button>
                  <Button variant="outline" size="sm" className="w-full shadow-none">
                    Email
                  </Button>
                </div>
                <p>Email: {event.organizer?.email}</p>
              </div>
            </Card>
          </aside>
        </div>
      </main>

      {/* Fixed Register Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white p-4 shadow-lg lg:hidden">
        <Button
          type="button"
          onClick={() => timeLeft > 0 && router.push("/registration")}
          className={`w-full ${timeLeft > 0 ? "bg-black": "bg-red-300 hover:bg-red-300 "} `}
          disabled={timeLeft <= 0}
        >
          {timeLeft > 0
            ? `Register Now (${formatTimeLeft(timeLeft)})`
            : "Registration Closed"}
        </Button>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={shareUrl}
      />
    </>
  );
}
