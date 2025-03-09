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

function ShareModal({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6">
        <h3 className="mb-4 text-lg font-bold">Share Event</h3>
        <div className="flex flex-col gap-3">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              shareUrl,
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
              shareUrl,
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

export default function EventPage() {
  // 1. Declare all hooks up front
  const router = useRouter();
  const { slug } = useParams();
  const { events } = useEvents();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // 2. Always define useCallback in the same order, whether or not event is found
  const handleScrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // 3. Identify the event
  const event = events.find((ev) => ev.id === slug);

  // 4. If not found, conditionally return (AFTER all hooks have been called)
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

  // 5. Prepare images for the carousel
  const images = Array.isArray(event.image)
    ? event.image
    : [event.image ?? "./notfound.svg"];

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* Top offset so carousel doesn't hide behind navbar */}
      <section className="relative mb-12 pt-20">
        <AutoCarousel images={images} className="min-h-[70vh] w-full" />
      </section>

      <main className="container mx-auto px-4 py-16 sm:px-6 sm:py-8 lg:px-36">
        {/* Example section nav */}
        <nav className="sticky top-0 z-30 mb-8 border-b border-zinc-900/20 bg-white py-4">
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={() => handleScrollTo("overview")}
            >
              Overview
            </Button>
            <Button variant="outline" onClick={() => handleScrollTo("prizes")}>
              Prizes
            </Button>
            <Button
              variant="outline"
              onClick={() => handleScrollTo("schedule")}
            >
              Schedule
            </Button>
            <Button variant="outline" onClick={() => handleScrollTo("team")}>
              Team
            </Button>
            <Button variant="outline" onClick={() => handleScrollTo("gallery")}>
              Gallery
            </Button>
            <Button variant="outline" onClick={() => handleScrollTo("faq")}>
              FAQ
            </Button>
          </div>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-20 space-y-6">
              <Card className="p-6">
                <Typography as="h2" className="mb-4 text-2xl font-bold">
                  {event.title.toUpperCase()}
                </Typography>
              </Card>
            </section>

            {/* Additional details if present */}
            {event.description && (
              <section id="details" className="scroll-mt-20 space-y-6">
                <Card className="p-6">
                  <Typography as="h2" className="mb-4 text-2xl font-bold">
                    About the Event
                  </Typography>
                  <div className="prose max-w-none whitespace-pre-line">
                    {event.description}
                  </div>
                </Card>
              </section>
            )}

            {/* Add custom sections for your event (prizes, schedule, team, etc.) */}
            <section id="prizes" className="scroll-mt-20 space-y-6">
              <Typography as="h1" className="text-2xl font-bold">
                Prizes
              </Typography>
              {/* Insert your <PrizeGrid /> or other components */}
            </section>

            <section id="schedule" className="scroll-mt-20 space-y-6">
              <Typography as="h1" className="text-2xl font-bold">
                Timeline and Schedule
              </Typography>
              {/* Insert your <Timeline /> or other components */}
            </section>

            <section id="team" className="scroll-mt-20 space-y-6">
              <Typography as="h1" className="text-2xl font-bold">
                Registered Teams
              </Typography>
              {/* Insert your <TeamGrid /> or other components */}
            </section>

            <section id="gallery" className="scroll-mt-20 space-y-6">
              <Typography as="h1" className="text-2xl font-bold">
                Gallery
              </Typography>
              {/* Insert your <EventGallery /> or other components */}
            </section>

            <section id="faq" className="scroll-mt-20 space-y-6">
              <Typography as="h1" className="text-2xl font-bold">
                FAQs
              </Typography>
              {/* Insert your <FAQAccordion /> or other components */}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="sticky top-20 z-20 w-full space-y-6 lg:w-[300px] lg:self-start">
            <Card className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <Typography as="h2" className="text-xl font-bold">
                  Register Now
                </Typography>
                <Button
                  variant="outline"
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-1"
                >
                  <Share2Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
              {/* For demonstration, assume "completed" means event is closed. Adjust as needed. */}
              {event ? (
                <Button type="button" disabled className="w-full bg-red-600">
                  Registration Closed
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => router.push("/registration")}
                  className="w-full"
                >
                  Register Now
                </Button>
              )}
            </Card>

            <Card className="p-4">
              <Typography as="h3" className="mb-2 font-semibold">
                Important Dates
              </Typography>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Registration Opens</span>
                  <span>Jan 1, 2024</span>
                </li>
                <li className="flex justify-between">
                  <span>Registration Closes</span>
                  <span>Feb 15, 2024</span>
                </li>
                <li className="flex justify-between">
                  <span>Event Starts</span>
                  <span>{event.start_date}</span>
                </li>
                <li className="flex justify-between">
                  <span>Event Ends</span>
                  <span>{event.end_date ?? event.start_date}</span>
                </li>
              </ul>
            </Card>

            <Card className="p-4">
              <Typography as="h3" className="mb-2 font-semibold">
                Contact Organizers
              </Typography>
              <div className="space-y-2 text-sm">
                <p>Email: contact@ethdenver.com</p>
                <p>Discord: ETHDenver Community</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Join Discord
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Email Us
                  </Button>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </main>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={shareUrl}
      />
    </>
  );
}
