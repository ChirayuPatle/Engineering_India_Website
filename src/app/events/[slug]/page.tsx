"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useEvents } from "@/context/eventContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Share2,
  Award,
  Target,
  Zap,
  ArrowLeft,
  DollarSign,
  ImageIcon,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Prize {
  position: string;
  description: string;
  value?: string;
}

interface TimelineItem {
  time: string;
  activity: string;
  location?: string;
  description?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface GalleryItem {
  src: string;
  alt?: string;
}

export default function EventPage() {
  const router = useRouter();
  const { slug } = useParams();
  const { events, loading } = useEvents();
  const [activeTab, setActiveTab] = useState("about");

  const event = events.find((ev) => ev.id === slug);

  const parseJsonField = <T,>(
    jsonString: string | null | undefined,
    defaultValue: T,
  ): T => {
    try {
      return jsonString ? (JSON.parse(jsonString) as T) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  const parsedPrizes = parseJsonField<Prize[]>(event?.prizes, []);
  const parsedFaqs = parseJsonField<FAQ[]>(event?.faqs, []);
  const parsedTimeline = parseJsonField<TimelineItem[]>(event?.timeline, []);
  const parsedGallery = parseJsonField<GalleryItem[]>(event?.gallery, []);

  const getDaysUntil = () => {
    if (!event?.startDate) return null;
    const diff = new Date(event.startDate).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : null;
  };

  const daysUntilEvent = getDaysUntil();

  // Check if event has ended
  const isEventEnded = () => {
    if (!event?.endDate) return false;
    return new Date(event.endDate).getTime() < new Date().getTime();
  };

  const eventEnded = isEventEnded();

  // Handle share functionality
  const handleShare = async () => {
    const shareData = {
      title: event?.name || "Event",
      text: `Check out this event: ${event?.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Handle registration
  const handleRegister = () => {
    const eventSlug = Array.isArray(slug) ? slug[0] : slug;
    router.push(`/dashboard/register/${eventSlug || ""}`);
  };

  if (loading || !event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const tabItems = [
    { id: "about", label: "About", icon: Target, show: true },
    {
      id: "prizes",
      label: "Prizes",
      icon: Trophy,
      show: parsedPrizes.length > 0,
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: Calendar,
      show: parsedTimeline.length > 0,
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: ImageIcon,
      show: parsedGallery.length > 0,
    },
    { id: "faq", label: "FAQs", icon: Zap, show: parsedFaqs.length > 0 },
  ].filter((tab) => tab.show);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Event Details (2/3 width) */}
            <div className="space-y-6 lg:col-span-2">
              {/* Event Header Card */}
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Event Banner */}
                {event.bannerImage && (
                  <div className="relative h-64 w-full bg-gray-100 sm:h-80">
                    <Image
                      src={event.bannerImage}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Event Info */}
                <div className="p-6 sm:p-8">
                  {/* Category Badge */}
                  <Badge className="mb-3 border-0 bg-blue-600 text-white hover:bg-blue-700">
                    {event.category || "Event"}
                  </Badge>

                  {/* Event Title */}
                  <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    {event.name}
                  </h1>

                  {/* Event Metadata */}
                  <div className="mb-6 flex flex-wrap gap-4 border-b border-gray-200 pb-6">
                    {event.startDate && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">
                          {format(new Date(event.startDate), "MMM dd, yyyy")}
                        </span>
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">
                          {event.location}
                        </span>
                      </div>
                    )}

                    {event.price !== null && event.price !== undefined && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">
                          {event.price === 0 ? "Free" : `₹${event.price}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <div className="scrollbar-hide flex gap-1 overflow-x-auto">
                    {tabItems.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-all sm:px-6 sm:py-4",
                            activeTab === tab.id
                              ? "border-blue-600 text-blue-600"
                              : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6 sm:p-8">
                  {/* About Tab */}
                  {activeTab === "about" && (
                    <div className="space-y-6">
                      {/* Event Description with Markdown */}
                      <div>
                        <h2 className="mb-4 text-xl font-bold text-gray-900">
                          About this Event
                        </h2>
                        <div className="prose prose-gray max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ node: _node, ...props }) => (
                                <h1
                                  className="mb-4 mt-6 text-2xl font-bold text-gray-900"
                                  {...props}
                                />
                              ),
                              h2: ({ node: _node, ...props }) => (
                                <h2
                                  className="mb-3 mt-5 text-xl font-bold text-gray-900"
                                  {...props}
                                />
                              ),
                              h3: ({ node: _node, ...props }) => (
                                <h3
                                  className="mb-2 mt-4 text-lg font-bold text-gray-900"
                                  {...props}
                                />
                              ),
                              p: ({ node: _node, ...props }) => (
                                <p
                                  className="mb-4 leading-relaxed text-gray-700"
                                  {...props}
                                />
                              ),
                              a: ({ node: _node, ...props }) => (
                                <a
                                  className="font-medium text-blue-600 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  {...props}
                                />
                              ),
                              ul: ({ node: _node, ...props }) => (
                                <ul
                                  className="mb-4 ml-6 list-disc space-y-2"
                                  {...props}
                                />
                              ),
                              ol: ({ node: _node, ...props }) => (
                                <ol
                                  className="mb-4 ml-6 list-decimal space-y-2"
                                  {...props}
                                />
                              ),
                              li: ({ node: _node, ...props }) => (
                                <li className="text-gray-700" {...props} />
                              ),
                              blockquote: ({ node: _node, ...props }) => (
                                <blockquote
                                  className="my-4 border-l-4 border-blue-600 pl-4 italic text-gray-600"
                                  {...props}
                                />
                              ),
                              code: ({ node: _node, inline, ...props }: any) =>
                                inline ? (
                                  <code
                                    className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-blue-600"
                                    {...props}
                                  />
                                ) : (
                                  <code
                                    className="block overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm"
                                    {...props}
                                  />
                                ),
                              strong: ({ node: _node, ...props }) => (
                                <strong
                                  className="font-semibold text-gray-900"
                                  {...props}
                                />
                              ),
                              em: ({ node: _node, ...props }) => (
                                <em
                                  className="italic text-gray-700"
                                  {...props}
                                />
                              ),
                              hr: ({ node: _node, ...props }) => (
                                <hr
                                  className="my-6 border-gray-300"
                                  {...props}
                                />
                              ),
                              table: ({ node: _node, ...props }) => (
                                <div className="my-4 overflow-x-auto">
                                  <table
                                    className="min-w-full divide-y divide-gray-300 border border-gray-300"
                                    {...props}
                                  />
                                </div>
                              ),
                              thead: ({ node: _node, ...props }) => (
                                <thead className="bg-gray-50" {...props} />
                              ),
                              tbody: ({ node: _node, ...props }) => (
                                <tbody
                                  className="divide-y divide-gray-200 bg-white"
                                  {...props}
                                />
                              ),
                              tr: ({ node: _node, ...props }) => (
                                <tr {...props} />
                              ),
                              th: ({ node: _node, ...props }) => (
                                <th
                                  className="border-r border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900 last:border-r-0"
                                  {...props}
                                />
                              ),
                              td: ({ node: _node, ...props }) => (
                                <td
                                  className="border-r border-gray-300 px-4 py-2 text-sm text-gray-700 last:border-r-0"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {event.description || "No description available."}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
                          <Award className="mb-3 h-8 w-8 text-blue-600" />
                          <h3 className="mb-2 font-semibold text-gray-900">
                            Open to All
                          </h3>
                          <p className="text-sm text-gray-700">
                            Students, professionals, and enthusiasts from all
                            backgrounds are welcome.
                          </p>
                        </div>

                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
                          <Trophy className="mb-3 h-8 w-8 text-blue-600" />
                          <h3 className="mb-2 font-semibold text-gray-900">
                            Exciting Rewards
                          </h3>
                          <p className="text-sm text-gray-700">
                            Winners receive certificates, prizes, and
                            recognition opportunities.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prizes Tab */}
                  {activeTab === "prizes" && parsedPrizes.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                        <Trophy className="h-6 w-6 text-blue-600" />
                        Prizes & Rewards
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {parsedPrizes.map((prize: Prize, index: number) => (
                          <div
                            key={index}
                            className="rounded-lg border-2 border-gray-200 bg-white p-5 transition-colors hover:border-blue-300"
                          >
                            <div className="mb-3 flex items-center gap-2">
                              <Trophy className="h-5 w-5 text-blue-600" />
                              <h3 className="text-lg font-bold text-gray-900">
                                {prize.position}
                              </h3>
                            </div>
                            <p className="mb-2 text-sm text-gray-700">
                              {prize.description}
                            </p>
                            {prize.value && (
                              <p className="text-lg font-bold text-blue-600">
                                {prize.value}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline Tab */}
                  {activeTab === "timeline" && parsedTimeline.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                        <Calendar className="h-6 w-6 text-blue-600" />
                        Event Timeline
                      </h2>
                      <div className="space-y-4">
                        {parsedTimeline.map(
                          (item: TimelineItem, index: number) => (
                            <div key={index} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white shadow-sm">
                                  {index + 1}
                                </div>
                                {index < parsedTimeline.length - 1 && (
                                  <div className="mt-2 h-full w-0.5 bg-gray-300" />
                                )}
                              </div>
                              <div className="flex-1 pb-6">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                                  <div className="mb-2 flex items-center gap-3">
                                    <Badge
                                      variant="outline"
                                      className="bg-white"
                                    >
                                      {item.time}
                                    </Badge>
                                    {item.location && (
                                      <span className="flex items-center gap-1 text-sm text-gray-600">
                                        <MapPin className="h-3 w-3" />
                                        {item.location}
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="mb-1 font-bold text-gray-900">
                                    {item.activity}
                                  </h3>
                                  {item.description && (
                                    <div className="text-sm">
                                      <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                          p: ({ node: _node, ...props }) => (
                                            <p
                                              className="mb-1 text-sm text-gray-700"
                                              {...props}
                                            />
                                          ),
                                          a: ({ node: _node, ...props }) => (
                                            <a
                                              className="text-sm font-medium text-blue-600 hover:underline"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              {...props}
                                            />
                                          ),
                                          ul: ({ node: _node, ...props }) => (
                                            <ul
                                              className="mb-1 ml-4 list-disc space-y-0.5 text-sm"
                                              {...props}
                                            />
                                          ),
                                          li: ({ node: _node, ...props }) => (
                                            <li
                                              className="text-sm text-gray-700"
                                              {...props}
                                            />
                                          ),
                                          code: ({
                                            node: _node,
                                            inline,
                                            ...props
                                          }: any) =>
                                            inline ? (
                                              <code
                                                className="rounded bg-white px-1 py-0.5 font-mono text-xs text-blue-600"
                                                {...props}
                                              />
                                            ) : null,
                                          strong: ({
                                            node: _node,
                                            ...props
                                          }) => (
                                            <strong
                                              className="text-sm font-semibold text-gray-900"
                                              {...props}
                                            />
                                          ),
                                        }}
                                      >
                                        {item.description}
                                      </ReactMarkdown>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {/* Gallery Tab */}
                  {activeTab === "gallery" && parsedGallery.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                        <ImageIcon className="h-6 w-6 text-blue-600" />
                        Event Gallery
                      </h2>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {parsedGallery.map((image, index) => (
                          <div
                            key={index}
                            className="group relative aspect-video overflow-hidden rounded-lg border border-gray-200"
                          >
                            <Image
                              src={image.src}
                              alt={image.alt || `Gallery image ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQ Tab */}
                  {activeTab === "faq" && parsedFaqs.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                        <Zap className="h-6 w-6 text-blue-600" />
                        Frequently Asked Questions
                      </h2>
                      <div className="space-y-3">
                        {parsedFaqs.map((faq: FAQ, index: number) => (
                          <div
                            key={index}
                            className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                          >
                            <h3 className="mb-3 flex items-start gap-2 font-semibold text-gray-900">
                              <span className="font-bold text-blue-600">
                                Q{index + 1}.
                              </span>
                              {faq.question}
                            </h3>
                            <div className="pl-7">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ node: _node, ...props }) => (
                                    <p
                                      className="mb-2 text-sm text-gray-700"
                                      {...props}
                                    />
                                  ),
                                  a: ({ node: _node, ...props }) => (
                                    <a
                                      className="text-sm font-medium text-blue-600 hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      {...props}
                                    />
                                  ),
                                  ul: ({ node: _node, ...props }) => (
                                    <ul
                                      className="mb-2 ml-4 list-disc space-y-1 text-sm"
                                      {...props}
                                    />
                                  ),
                                  ol: ({ node: _node, ...props }) => (
                                    <ol
                                      className="mb-2 ml-4 list-decimal space-y-1 text-sm"
                                      {...props}
                                    />
                                  ),
                                  li: ({ node: _node, ...props }) => (
                                    <li
                                      className="text-sm text-gray-700"
                                      {...props}
                                    />
                                  ),
                                  code: ({
                                    node: _node,
                                    inline,
                                    ...props
                                  }: any) =>
                                    inline ? (
                                      <code
                                        className="rounded bg-white px-1 py-0.5 font-mono text-xs text-blue-600"
                                        {...props}
                                      />
                                    ) : (
                                      <code
                                        className="block overflow-x-auto rounded bg-white p-2 font-mono text-xs"
                                        {...props}
                                      />
                                    ),
                                  strong: ({ node: _node, ...props }) => (
                                    <strong
                                      className="text-sm font-semibold text-gray-900"
                                      {...props}
                                    />
                                  ),
                                }}
                              >
                                {faq.answer}
                              </ReactMarkdown>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Registration Card (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Register for Event
                </h2>

                {/* Registration Deadline */}
                {event.endDate && (
                  <div className="mb-5 rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-orange-700">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase">
                        Deadline
                      </span>
                    </div>
                    <p className="text-sm font-bold text-orange-900">
                      {format(new Date(event.endDate), "MMM dd, yyyy")}
                    </p>
                  </div>
                )}

                {/* Quick Stats */}
                {(event.price !== null ||
                  parsedPrizes.length > 0 ||
                  daysUntilEvent) && (
                  <div className="mb-6 space-y-3 border-b border-gray-200 pb-6">
                    {event.price !== null && event.price !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Entry Fee</span>
                        <span className="text-lg font-bold text-gray-900">
                          {event.price === 0 ? "Free" : `₹${event.price}`}
                        </span>
                      </div>
                    )}
                    {parsedPrizes.length > 0 && parsedPrizes[0]?.value && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Prize Pool
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          {parsedPrizes[0].value}
                        </span>
                      </div>
                    )}
                    {daysUntilEvent && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Starts In</span>
                        <span className="text-lg font-bold text-gray-900">
                          {daysUntilEvent} Days
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className={cn(
                      "h-12 w-full font-semibold shadow-sm",
                      eventEnded
                        ? "cursor-not-allowed bg-gray-400 text-white hover:bg-gray-400"
                        : "bg-blue-600 text-white hover:bg-blue-700",
                    )}
                    onClick={handleRegister}
                    disabled={eventEnded}
                  >
                    {eventEnded ? "Event Ended" : "Register Now"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button>
                </div>

                {/* Organizer Info */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <p className="mb-3 text-sm text-gray-600">Organized by</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                      <span className="text-sm font-bold text-white">EI</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Engineering India Club YCCE
                      </p>
                      <p className="text-xs text-gray-500">
                        Verified Organizer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg lg:hidden">
        <div className="flex gap-3">
          <Button
            size="lg"
            className={cn(
              "h-12 flex-1 font-semibold shadow-sm",
              eventEnded
                ? "cursor-not-allowed bg-gray-400 text-white hover:bg-gray-400"
                : "bg-blue-600 text-white hover:bg-blue-700",
            )}
            onClick={handleRegister}
            disabled={eventEnded}
          >
            {eventEnded ? "Event Ended" : "Register Now"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
