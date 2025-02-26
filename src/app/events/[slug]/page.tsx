"use client";

import { EventGallery } from "@/components/events/eventGallery";
import { FAQAccordion } from "@/components/events/faqAccordian";
import { PrizeGrid } from "@/components/events/prizeGrid";
import { TeamGrid } from "@/components/events/team-grid";
import { Timeline } from "@/components/events/timeline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import {
  Link2,
  Linkedin,
  MessageCircleMore,
  Share2Icon,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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

const allEvents = {
  "tech-talk-ai": {
    title: "Tech Talk: Future of AI",
    date: "March 15, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Main Auditorium",
    description:
      "Join us for an exciting discussion about the future of AI. Our panel of experts will explore the latest developments in artificial intelligence and machine learning.",
    detailedDescription: `Artificial Intelligence (AI) is reshaping our world. In this talk, Dr. Sarah Chen—AI Research Director at TechCorp—will delve into:
    
- The evolution of machine learning algorithms.
- The impact of AI on job markets.
- Emerging trends and technologies in AI research.
- Ethical considerations in AI deployment.

Whether you're a student, professional, or tech enthusiast, this session will provide valuable insights and spark engaging discussions.`,
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80",
    ],
    category: "Tech Talk",
    speaker: "Dr. Sarah Chen",
    speakerTitle: "AI Research Director at TechCorp",
    capacity: 200,
    remainingSeats: 45,
    completed: true,
  },
  "coding-workshop": {
    title: "Coding Workshop",
    date: "March 20, 2024",
    time: "10:00 AM - 3:00 PM",
    location: "Computer Lab",
    description:
      "Learn the basics of web development in this hands-on workshop. We'll cover HTML, CSS, and JavaScript fundamentals.",
    detailedDescription:
      "This workshop will cover fundamental web development concepts including HTML structure, CSS styling, and JavaScript programming.",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    ],
    category: "Workshop",
    speaker: "John Smith",
    speakerTitle: "Senior Web Developer",
    capacity: 30,
    remainingSeats: 8,
    completed: true,
  },
};

export default function EventPage() {
  const { slug } = useParams();
  const router = useRouter();
  const event = allEvents[slug as keyof typeof allEvents];
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleScrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (!event) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <section className="relative mb-12">
        <AutoCarousel images={event.images} className="min-h-[70vh] w-full" />
      </section>

      <main className="container mx-auto px-4 py-16 sm:px-6 sm:py-8 lg:px-36">
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
                <h2 className="mb-4 text-2xl font-bold">
                  {event.title.toUpperCase()}
                </h2>
                <div className="prose max-w-none">
                  <p>{event.description}</p>
                </div>
              </Card>
            </section>

            {/* Detailed Description Section */}
            {event.detailedDescription && (
              <section id="details" className="scroll-mt-20 space-y-6">
                <Card className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">About the Event</h2>
                  <div className="prose max-w-none whitespace-pre-line">
                    <p>{event.detailedDescription}</p>
                  </div>
                </Card>
              </section>
            )}

            <section id="prizes" className="scroll-mt-20 space-y-6">
              <h1 className="text-2xl font-bold">Prizes</h1>
              <PrizeGrid />
            </section>

            <section id="schedule" className="scroll-mt-20 space-y-6">
              <h1 className="text-2xl font-bold">Timeline and Schedule</h1>
              <Timeline />
            </section>

            <section id="team" className="scroll-mt-20 space-y-6">
              <h1 className="text-2xl font-bold">Registered Teams</h1>
              <TeamGrid />
            </section>

            <section id="gallery" className="scroll-mt-20 space-y-6">
              <h1 className="text-2xl font-bold">Gallery</h1>
              <EventGallery />
            </section>

            <section id="faq" className="scroll-mt-20 space-y-6">
              <h1 className="text-2xl font-bold">FAQs</h1>
              <FAQAccordion />
            </section>
          </div>

          <aside className="sticky top-20 z-20 w-full space-y-6 lg:w-[300px] lg:self-start">
            <Card className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Register Now</h2>
                <Button
                  variant={"default"}
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-1 border-[1px] border-blue-600 bg-transparent text-blue-600"
                >
                  <Share2Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
              {event.completed ? (
                <Button
                  type="button"
                  disabled
                  className="w-full border-none bg-red-600"
                >
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
              <h3 className="mb-2 font-semibold">Important Dates</h3>
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
                  <span>{event.date}</span>
                </li>
                <li className="flex justify-between">
                  <span>Event Ends</span>
                  <span>{event.date}</span>
                </li>
              </ul>
            </Card>

            <Card className="p-4">
              <h3 className="mb-2 font-semibold">Contact Organizers</h3>
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
