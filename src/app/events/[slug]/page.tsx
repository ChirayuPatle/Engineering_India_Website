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
  ImageIcon
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

  const parseJsonField = <T,>(jsonString: string | null | undefined, defaultValue: T): T => {
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
    router.push(`/dashboard/register/${eventSlug || ''}`);
  };

  if (loading || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const tabItems = [
    { id: "about", label: "About", icon: Target, show: true },
    { id: "prizes", label: "Prizes", icon: Trophy, show: parsedPrizes.length > 0 },
    { id: "timeline", label: "Timeline", icon: Calendar, show: parsedTimeline.length > 0 },
    { id: "gallery", label: "Gallery", icon: ImageIcon, show: parsedGallery.length > 0 },
    { id: "faq", label: "FAQs", icon: Zap, show: parsedFaqs.length > 0 },
  ].filter(tab => tab.show);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column - Event Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Event Header Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Event Banner */}
                {event.bannerImage && (
                  <div className="relative w-full h-64 sm:h-80 bg-gray-100">
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
                  <Badge className="mb-3 bg-blue-600 hover:bg-blue-700 text-white border-0">
                    {event.category || "Event"}
                  </Badge>

                  {/* Event Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {event.name}
                  </h1>

                  {/* Event Metadata */}
                  <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
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
                        <span className="text-sm font-medium">{event.location}</span>
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                    {tabItems.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm whitespace-nowrap transition-all border-b-2",
                            activeTab === tab.id
                              ? "text-blue-600 border-blue-600"
                              : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
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
                        <h2 className="text-xl font-bold text-gray-900 mb-4">About this Event</h2>
                        <div className="prose prose-gray max-w-none">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({node: _node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4" {...props} />,
                              h2: ({node: _node, ...props}) => <h2 className="text-xl font-bold text-gray-900 mt-5 mb-3" {...props} />,
                              h3: ({node: _node, ...props}) => <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2" {...props} />,
                              p: ({node: _node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                              a: ({node: _node, ...props}) => <a className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                              ul: ({node: _node, ...props}) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
                              ol: ({node: _node, ...props}) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
                              li: ({node: _node, ...props}) => <li className="text-gray-700" {...props} />,
                              blockquote: ({node: _node, ...props}) => <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600 my-4" {...props} />,
                              code: ({node: _node, inline, ...props}: any) => 
                                inline ? (
                                  <code className="bg-gray-100 text-blue-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                                ) : (
                                  <code className="block bg-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto" {...props} />
                                ),
                              strong: ({node: _node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                              em: ({node: _node, ...props}) => <em className="italic text-gray-700" {...props} />,
                              hr: ({node: _node, ...props}) => <hr className="my-6 border-gray-300" {...props} />,
                              table: ({node: _node, ...props}) => <div className="overflow-x-auto my-4"><table className="min-w-full divide-y divide-gray-300 border border-gray-300" {...props} /></div>,
                              thead: ({node: _node, ...props}) => <thead className="bg-gray-50" {...props} />,
                              tbody: ({node: _node, ...props}) => <tbody className="divide-y divide-gray-200 bg-white" {...props} />,
                              tr: ({node: _node, ...props}) => <tr {...props} />,
                              th: ({node: _node, ...props}) => <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-r border-gray-300 last:border-r-0" {...props} />,
                              td: ({node: _node, ...props}) => <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300 last:border-r-0" {...props} />,
                            }}
                          >
                            {event.description || "No description available."}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div className="grid sm:grid-cols-2 gap-4 mt-6">
                        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                          <Award className="h-8 w-8 text-blue-600 mb-3" />
                          <h3 className="font-semibold text-gray-900 mb-2">Open to All</h3>
                          <p className="text-sm text-gray-700">Students, professionals, and enthusiasts from all backgrounds are welcome.</p>
                        </div>
                        
                        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                          <Trophy className="h-8 w-8 text-blue-600 mb-3" />
                          <h3 className="font-semibold text-gray-900 mb-2">Exciting Rewards</h3>
                          <p className="text-sm text-gray-700">Winners receive certificates, prizes, and recognition opportunities.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prizes Tab */}
                  {activeTab === "prizes" && parsedPrizes.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-blue-600" />
                        Prizes & Rewards
                      </h2>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {parsedPrizes.map((prize: Prize, index: number) => (
                          <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                              <Trophy className="h-5 w-5 text-blue-600" />
                              <h3 className="font-bold text-lg text-gray-900">{prize.position}</h3>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{prize.description}</p>
                            {prize.value && (
                              <p className="text-blue-600 font-bold text-lg">{prize.value}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline Tab */}
                  {activeTab === "timeline" && parsedTimeline.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="h-6 w-6 text-blue-600" />
                        Event Timeline
                      </h2>
                      <div className="space-y-4">
                        {parsedTimeline.map((item: TimelineItem, index: number) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
                                {index + 1}
                              </div>
                              {index < parsedTimeline.length - 1 && (
                                <div className="w-0.5 h-full bg-gray-300 mt-2" />
                              )}
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge variant="outline" className="bg-white">{item.time}</Badge>
                                  {item.location && (
                                    <span className="text-sm text-gray-600 flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {item.location}
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{item.activity}</h3>
                                {item.description && (
                                  <div className="text-sm">
                                    <ReactMarkdown 
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        p: ({node: _node, ...props}) => <p className="text-gray-700 text-sm mb-1" {...props} />,
                                        a: ({node: _node, ...props}) => <a className="text-blue-600 hover:underline font-medium text-sm" target="_blank" rel="noopener noreferrer" {...props} />,
                                        ul: ({node: _node, ...props}) => <ul className="list-disc ml-4 mb-1 space-y-0.5 text-sm" {...props} />,
                                        li: ({node: _node, ...props}) => <li className="text-gray-700 text-sm" {...props} />,
                                        code: ({node: _node, inline, ...props}: any) => 
                                          inline ? (
                                            <code className="bg-white text-blue-600 px-1 py-0.5 rounded text-xs font-mono" {...props} />
                                          ) : null,
                                        strong: ({node: _node, ...props}) => <strong className="font-semibold text-gray-900 text-sm" {...props} />,
                                      }}
                                    >
                                      {item.description}
                                    </ReactMarkdown>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gallery Tab */}
                  {activeTab === "gallery" && parsedGallery.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ImageIcon className="h-6 w-6 text-blue-600" />
                        Event Gallery
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {parsedGallery.map((image, index) => (
                          <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group">
                            <Image
                              src={image.src}
                              alt={image.alt || `Gallery image ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQ Tab */}
                  {activeTab === "faq" && parsedFaqs.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Zap className="h-6 w-6 text-blue-600" />
                        Frequently Asked Questions
                      </h2>
                      <div className="space-y-3">
                        {parsedFaqs.map((faq: FAQ, index: number) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-start gap-2">
                              <span className="text-blue-600 font-bold">Q{index + 1}.</span>
                              {faq.question}
                            </h3>
                            <div className="pl-7">
                              <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({node: _node, ...props}) => <p className="text-gray-700 text-sm mb-2" {...props} />,
                                  a: ({node: _node, ...props}) => <a className="text-blue-600 hover:underline font-medium text-sm" target="_blank" rel="noopener noreferrer" {...props} />,
                                  ul: ({node: _node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1 text-sm" {...props} />,
                                  ol: ({node: _node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1 text-sm" {...props} />,
                                  li: ({node: _node, ...props}) => <li className="text-gray-700 text-sm" {...props} />,
                                  code: ({node: _node, inline, ...props}: any) => 
                                    inline ? (
                                      <code className="bg-white text-blue-600 px-1 py-0.5 rounded text-xs font-mono" {...props} />
                                    ) : (
                                      <code className="block bg-white p-2 rounded text-xs font-mono overflow-x-auto" {...props} />
                                    ),
                                  strong: ({node: _node, ...props}) => <strong className="font-semibold text-gray-900 text-sm" {...props} />,
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Register for Event</h2>
                
                {/* Registration Deadline */}
                {event.endDate && (
                  <div className="mb-5 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 text-orange-700 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase">Deadline</span>
                    </div>
                    <p className="text-orange-900 font-bold text-sm">
                      {format(new Date(event.endDate), "MMM dd, yyyy")}
                    </p>
                  </div>
                )}

                {/* Quick Stats */}
                {(event.price !== null || parsedPrizes.length > 0 || daysUntilEvent) && (
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
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
                        <span className="text-sm text-gray-600">Prize Pool</span>
                        <span className="text-lg font-bold text-gray-900">{parsedPrizes[0].value}</span>
                      </div>
                    )}
                    {daysUntilEvent && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Starts In</span>
                        <span className="text-lg font-bold text-gray-900">{daysUntilEvent} Days</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 shadow-sm"
                    onClick={handleRegister}
                  >
                    Register Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 hover:bg-gray-50"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                </div>

                {/* Organizer Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">Organized by</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">EI</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Entrepreneurship & Innovation Cell</p>
                      <p className="text-xs text-gray-500">Verified Organizer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50 shadow-lg">
        <div className="flex gap-3">
          <Button 
            size="lg" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12"
            onClick={handleRegister}
          >
            Register Now
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
