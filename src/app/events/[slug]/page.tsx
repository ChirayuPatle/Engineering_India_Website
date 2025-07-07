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
  TriangleAlert,
} from "lucide-react";
import EventHeader from "@/components/events/EventHeader";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

// Helper functions (kept from previous version)
function BlurImage(props: any) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      {...props}
      alt={props.alt || ""}
      className={`${props.className} transition duration-700 ease-in-out ${
        isLoading ? "blur-2xl" : "blur-0"
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}

const EventPageSkeleton = () => (
  <>
    <Skeleton className="h-[300px] w-full" />
    <main className="container mx-auto px-4 py-16 sm:px-6 sm:py-8 lg:px-36">
      <nav className="sticky top-0 z-30 mb-8 border-b border-zinc-900/20 bg-white py-4">
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-12">
          <section className="scroll-mt-20 space-y-6">
            <Card className="p-6 shadow-none">
              <Skeleton className="mb-4 h-8 w-64" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          </section>
          <section className="scroll-mt-20 space-y-6">
            <Skeleton className="mb-4 h-8 w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </section>
        </div>

        <aside className="sticky top-20 z-20 hidden w-full space-y-6 md:block lg:w-[300px] lg:self-start">
          <Card className="p-4 shadow-none">
            <Skeleton className="mb-4 h-8 w-48" />
            <Skeleton className="h-10 w-full" />
          </Card>
        </aside>
      </div>
    </main>
  </>
);

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
  const { events, loading, error } = useEvents();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const handleScrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Define event and derived data outside conditional blocks
  const event = events.find((ev) => ev.id === slug);

  

  const parseJsonField = (jsonString: string | null | undefined, defaultValue: any): any => {
  try {
    return jsonString ? JSON.parse(jsonString) : defaultValue;
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return defaultValue;
  }
};

  const parsedPrizes = parseJsonField(event?.prizes, []);
  const parsedFaqs = parseJsonField(event?.faqs, []);
  const parsedTimeline = parseJsonField(event?.timeline, []);
  const parsedGallery = parseJsonField(event?.gallery, []);

  const formattedEvent = event ? {
    event_title: event.name,
    event_start_date: event.startDate
      ? format(new Date(event.startDate), "yyyy-MM-dd")
      : "",
    event_venue: event.location || "N/A",
    event_id: event.id,
    event_image: event.bannerImage || "/placeholder-image.jpg",
    registration_fee: event.price,
    event_description: event.description || "",
    co_organized_by: event.coOrganizerContact || "",
    organized_by: event.organizerContact || "",
  } : null;

  useEffect(() => {
    if (!event?.endDate) {
      setTimeLeft(0);
      return;
    }
    const regClose = new Date(event.endDate);
    const updateTime = () => {
      const diff = regClose.getTime() - new Date().getTime();
      setTimeLeft(diff);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [event?.endDate]);

  const navItems = [
    { id: "overview", label: "Overview", condition: true },
    {
      id: "prizes",
      label: "Prizes",
      condition: parsedPrizes.length > 0,
    },
    {
      id: "schedule",
      label: "Schedule",
      condition: parsedTimeline.length > 0,
    },
    {
      id: "gallery",
      label: "Gallery",
      condition: parsedGallery.length > 0,
    },
    {
      id: "faq",
      label: "FAQ",
      condition: parsedFaqs.length > 0,
    },
  ];

  if (loading) {
    return <EventPageSkeleton />;
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-400 bg-red-50 p-6 text-center text-red-700 shadow-sm">
          <TriangleAlert className="h-12 w-12 text-red-500 mb-4" />
          <span className="text-xl font-semibold">Error loading event details.</span>
          <p className="mt-2 text-sm">
            We couldn't load the event you're looking for. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-muted bg-muted/50 p-6 text-center text-muted-foreground shadow-sm">
          <TriangleAlert className="h-12 w-12 text-muted-foreground mb-4" />
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

  return (
    <>
      {formattedEvent && <EventHeader event={formattedEvent} />}

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
              ) : null,
            )}
          </div>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {event.description && (
              <section id="overview" className="scroll-mt-20 space-y-6">
                <Card className="p-6 shadow-none">
                  <Typography as="h2" className="mb-4 text-2xl font-bold">
                    About the Event
                  </Typography>
                  <div className="prose max-w-none whitespace-pre-line">
                    {event.description}
                  </div>
                </Card>
              </section>
            )}

            {parsedPrizes.length > 0 && (
              <section id="prizes" className="scroll-mt-20 space-y-6">
                <Typography as="h1" className="text-2xl font-bold">
                  Prizes
                </Typography>
                {/* Render prizes here */}
                {parsedPrizes.map((prize, index) => (
                  <Card key={index} className="p-4 shadow-none">
                    <Typography as="h3" className="font-semibold">
                      {prize.position}
                    </Typography>
                    <p>{prize.description}</p>
                    {prize.value && <p>Value: {prize.value}</p>}
                  </Card>
                ))}
              </section>
            )}

            {parsedTimeline.length > 0 && (
              <section id="schedule" className="scroll-mt-20 space-y-6">
                <Typography as="h1" className="text-2xl font-bold">
                  Timeline and Schedule
                </Typography>
                {/* Render timeline here */}
                {parsedTimeline.map((item, index) => (
                  <Card key={index} className="p-4 shadow-none">
                    <Typography as="h3" className="font-semibold">
                      {item.time} - {item.activity}
                    </Typography>
                    {item.location && <p>Location: {item.location}</p>}
                    {item.description && <p>{item.description}</p>}
                  </Card>
                ))}
              </section>
            )}

            {parsedGallery.length > 0 && (
              <section id="gallery" className="scroll-mt-20 space-y-6">
                <Typography as="h1" className="text-2xl font-bold">
                  Gallery
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {parsedGallery.map((imgSrc, index) => (
                    <div key={index} className="relative h-48 w-full">
                      <BlurImage
                        src={imgSrc}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {parsedFaqs.length > 0 && (
              <section id="faq" className="scroll-mt-20 space-y-6">
                <Typography as="h1" className="text-2xl font-bold">
                  FAQs
                </Typography>
                {/* Render FAQs here */}
                {parsedFaqs.map((faq, index) => (
                  <Card key={index} className="p-4 shadow-none">
                    <Typography as="h3" className="font-semibold">
                      Q: {faq.question}
                    </Typography>
                    <p>A: {faq.answer}</p>
                  </Card>
                ))}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="sticky top-20 z-20 hidden w-full space-y-6 md:block lg:w-[300px] lg:self-start">
            <Card className="p-4 shadow-none">
              <div className="mb-4 flex items-center justify-between">
                <Typography as="h2" className="text-xl font-bold">
                  {timeLeft > 0 ? "Register Now 🚀" : "Event Ended"}
                </Typography>
              </div>
              <Button
                type="button"
                disabled={timeLeft < 0}
                onClick={() => timeLeft > 0 && router.push("/registration")}
                className={`w-full ${timeLeft > 0 ? "bg-black" : "bg-red-300 hover:bg-red-300"} `}
              >
                {timeLeft > 0
                  ? `Register Now (${formatTimeLeft(timeLeft)})`
                  : "Registration Closed"}
              </Button>
            </Card>
          </aside>
        </div>
      </main>

      {/* Fixed Register Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white p-4 shadow-lg lg:hidden">
        <Button
          type="button"
          onClick={() => timeLeft > 0 && router.push("/registration")}
          className={`w-full ${timeLeft > 0 ? "bg-black" : "bg-red-300 hover:bg-red-300"} `}
          disabled={timeLeft <= 0}
        >
          {timeLeft > 0
            ? `Register Now (${formatTimeLeft(timeLeft)})`
            : "Registration Closed"}
        </Button>
      </div>
    </>
  );
}