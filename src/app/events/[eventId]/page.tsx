"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Calendar, Globe, Heart, Share2 } from "lucide-react";
import { cn } from "@/libs/utils";
import EventMetrics from "@/features/event/component/event-info/event-metric";
import EventRegistration from "@/features/event/component/event-info/event-registration";
import FAQsSection from "@/features/event/component/event-info/faq-section";
import FeedbackSection from "@/features/event/component/event-info/feedback-section";
import PrizesSection from "@/features/event/component/event-info/price-section";
import Timeline from "@/features/event/component/event-info/timeline";

// Import all event data arrays
import {
  Chitrankan,
  DonationDrive,
  Rangittalim3,
  Rangittalim4,
  Abhudaya,
  ShivajiJayanti,
} from "@/constant/events";

// Animation variant for a fadeInUp effect
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Navigation sections for scrolling within the page
const sections = [
  { id: "timeline", label: "Stages & Timeline" },
  { id: "details", label: "Details" },
  { id: "prizes", label: "Prizes" },
  { id: "feedback", label: "Feedbacks" },
  { id: "faqs", label: "FAQs" },
];

export default function EventPage() {
  // Get the eventId from the URL parameters
  const params = useParams();
  const eventId = parseInt(params.eventId as string, 10);

  // Combine all events into one array
  const events = [
    ...Chitrankan,
    ...DonationDrive,
    ...Rangittalim3,
    ...Rangittalim4,
    ...Abhudaya,
    ...ShivajiJayanti,
  ];

  // Find the event whose id matches the eventId param
  const eventData = events.find(
    (event) => event.id === eventId
  ) as { imgUrl: string[]; id: number; name?: string; details?: string };

  if (!eventData) {
    return <div>Event not found</div>;
  }

  // Destructure event data with fallbacks
  const images: string[] = eventData.imgUrl;
  const eventName: string = eventData?.name || "Event Name";
  const eventDetails: string =
    eventData?.details || "Event details will be updated soon.";

  // State for the auto-sliding hero banner images
  const [currentIndex, setCurrentIndex] = useState(0);
  // State for active navigation section
  const [activeSection, setActiveSection] = useState("timeline");
  // State for like button
  const [liked, setLiked] = useState(false);

  // Auto-slide: update current image index every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Handler to scroll to a given section by its ID
  const scrollToSection = ({ sectionId }: { sectionId: string }): void => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Handler for the Like button
  const handleLike = () => {
    setLiked((prev) => !prev);
    // Optionally, update like count via an API
  };

  // Handler to open a pre-filled Google Calendar event
  const handleCalendar = () => {
    const start = "20250415T090000Z";
    const end = "20250417T180000Z";
    const title = encodeURIComponent(eventName);
    const details = encodeURIComponent(eventDetails);
    const location = encodeURIComponent("Tech Convention Center");
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(calendarUrl, "_blank");
  };

  // Handler to share the current page URL
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link. Please try manually.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner with Auto-Sliding Images */}
      <motion.div
        className="relative h-[300px] sm:h-[550px] rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Event Banner ${index + 1}`}
            // Removed fixed horizontal padding and added object-contain for responsiveness
            className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8">
        {/* Event Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-6 mb-8 bg-white rounded-lg p-6 shadow-sm"
          {...fadeInUp}
        >
          <img
            // Use the first image as the event logo (or customize as needed)
            src={images[0]}
            alt={`${eventName} Logo`}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">{eventName}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="w-3 h-3" /> Online
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleLike}>
              <Heart className={`w-4 h-4 ${liked ? "text-red-500" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleCalendar}>
              <Calendar className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Registration Sidebar (Desktop: Right; Mobile: Top) */}
          <div className="order-1 lg:order-2 lg:w-[320px] shrink-0">
            <div className="sticky top-4 space-y-6">
              <EventRegistration />
              <EventMetrics />
            </div>
          </div>

          {/* Main Content Section */}
          <div className="order-2 lg:order-1 flex-1">
            {/* Navigation Buttons */}
            <div className="sticky top-0 z-10 bg-background py-2 mb-8 border-b overflow-x-auto hide-scrollbar flex gap-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className={cn(
                    "rounded-full",
                    activeSection === section.id &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => scrollToSection({ sectionId: section.id })}
                >
                  {section.label}
                </Button>
              ))}
            </div>

            {/* Scrollable Sections */}
            <div className="space-y-12">
              <div id="timeline">
                <Timeline />
              </div>
              <Separator />
              <div id="details">
                <div className="p-4 bg-gray-100 rounded">
                  <p>{eventDetails}</p>
                </div>
              </div>
              {/* <Separator /> */}
              {/* <div id="prizes">
                <PrizesSection />
              </div> */}
              <Separator />
              <div id="feedback">
                <FeedbackSection />
              </div>
              <Separator />
              <div id="faqs">
                <FAQsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
