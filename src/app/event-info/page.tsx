"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EventMetrics from "@/features/event/component/event-info/event-metric";
import EventRegistration from "@/features/event/component/event-info/event-registration";
import FAQsSection from "@/features/event/component/event-info/faq-section";
import FeedbackSection from "@/features/event/component/event-info/feedback-section";
import PrizesSection from "@/features/event/component/event-info/price-section";
import Timeline from "@/features/event/component/event-info/timeline";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";
import { Calendar, Clock, Globe, Heart, Share2, Trophy } from "lucide-react";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const sections = [
  { id: "timeline", label: "Stages & Timeline" },
  { id: "details", label: "Details" },
  { id: "prizes", label: "Prizes" },
  { id: "feedback", label: "Feedbacks" },
  { id: "faqs", label: "FAQs" },
];

export default function EventPage() {
  const [activeSection, setActiveSection] = useState("timeline");
  const [liked, setLiked] = useState(false);

  // Handler to scroll to section with the given id
  interface ScrollToSectionProps {
    sectionId: string;
  }

  const scrollToSection = ({ sectionId }: ScrollToSectionProps): void => {
    const el: HTMLElement | null = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Handler for the Like button
  const handleLike = () => {
    setLiked((prev) => !prev);
    // Optionally, call an API to update like count, etc.
  };

  // Handler for the Calendar button (opens a pre-filled Google Calendar event)
  const handleCalendar = () => {
    // Customize the event details as needed
    const start = "20250415T090000Z";
    const end = "20250417T180000Z";
    const title = encodeURIComponent("CreaTech 2025");
    const details = encodeURIComponent(
      "Join us for the biggest tech conference of the year!"
    );
    const location = encodeURIComponent("Tech Convention Center");
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(calendarUrl, "_blank");
  };

  // Handler for the Share button (copies current URL to clipboard)
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
      {/* Hero Banner */}
      <motion.div
        className="relative h-[300px] sm:h-[400px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://images.unsplash.com/photo-1739032713558-017ad58b0fbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          alt="Event Banner"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8">
        {/* Event Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-6 mb-8 bg-white rounded-lg p-6 shadow-sm"
          {...fadeInUp}
        >
          <img
            src="https://images.unsplash.com/photo-1739032713558-017ad58b0fbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            alt="Event Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">
              CreaTech 2025
            </h1>
            <p className="text-muted-foreground">Larsen & Toubro</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="w-3 h-3" /> Online
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated: Feb 9, 2025
              </Badge>
            </div>
            <div className="mt-4">
              <Badge className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100">
                <Trophy className="w-4 h-4 mr-1" />
                Pre-Placement Interviews & Prizes worth ₹2,25,000
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
          {/* Registration Sidebar: Mobile -> top; Desktop -> right */}
          <div className="order-1 lg:order-2 lg:w-[320px] shrink-0">
            <div className="sticky top-4 space-y-6">
              <EventRegistration />
              <EventMetrics />
            </div>
          </div>

          {/* Main Content: Mobile -> below registration; Desktop -> left side */}
          <div className="order-2 lg:order-1 flex-1">
            {/* Navigation */}
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
                {/* Placeholder for Details Section */}
                <div className="p-4 bg-gray-100 rounded">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  enim mollitia aliquam velit magni, vitae accusamus totam.
                  Magni, quidem. Ut voluptatibus fugiat, consectetur rerum
                  maiores alias esse quae! Assumenda obcaecati, explicabo nemo
                  iste illum nisi veniam atque labore laudantium adipisci quod
                  est ab iure laboriosam dolores vero! Ad voluptates quam veniam
                  adipisci, amet harum molestias odio, quo dolorum eos magnam
                  non consequuntur aut explicabo exercitationem atque cumque
                  ratione quidem omnis maxime accusantium natus distinctio a ea!
                  Deleniti ex accusantium esse repudiandae aperiam, excepturi
                  laborum repellat dolorem cumque sint qui iure hic illum
                  obcaecati vel temporibus ipsa veritatis expedita nobis ad.
                </div>
              </div>
              <Separator />
              <div id="prizes">
                <PrizesSection />
              </div>
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
