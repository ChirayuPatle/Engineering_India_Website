"use client";

import { useState, useEffect } from "react";
import { getEventById } from "@/lib/event-mock-data";
import { type Event } from "@/context/eventContext";
// import { useToast } from '@/hooks/use-toast';
import { Loader2 } from "lucide-react";

import EventHeader from "@/components/vevents/EventHeader";
import EventDescription from "@/components/vevents/EventDescription";
import EventSchedule from "@/components/vevents/EventSchedule";
import EventPrizes from "@/components/vevents/EventPrizes";
import EventGallery from "@/components/vevents/EventGallery";
import EventFAQ from "@/components/vevents/EventFAQ";
import EventRegistration from "@/components/vevents/EventRegistration";
import EventNavigation from "@/components/vevents/EventNavigation";
import EventContactShare from "@/components/vevents/EventContactShare";
import { useParams } from "next/navigation";
import Link from "next/link";

const EventPage = () => {
  const { id = "1" } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //   const { toast } = useToast();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const data = await getEventById(id);
        setEvent(data);
      } catch (err: any) {
        setError("Failed to load event details.");
        // toast({
        //   title: 'Error',
        //   description: 'Could not load event details. Please try again later.',
        //   variant: 'destructive',
        // });
        alert(`Error fetching event: ${err}`);
        console.error("Error fetching event:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="event-container flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-black" />
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="event-container flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Event Not Found
          </h2>
          <p className="mb-6 text-gray-600">
            {error || "The event you are looking for does not exist."}
          </p>
          <Link href="/" className="text-black hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Full-width header section */}
      <EventHeader event={event} />

      <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 md:py-8">
        {/* Navigation */}
        <EventNavigation className="mb-6 md:mb-8" />

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* About section */}
            <section id="about">
              <EventDescription event={event} />
            </section>

            {/* Schedule section */}
            <section id="schedule">
              <EventSchedule event={event} />
            </section>

            {/* Prizes section */}
            <section id="prizes">
              <EventPrizes event={event} />
            </section>

            {/* Gallery section */}
            <section id="gallery" className="w-full">
              <EventGallery event={event} />
            </section>

            {/* FAQ section */}
            <section id="faq">
              <EventFAQ event={event} />
            </section>

            {/* Registration section (only visible for desktop) */}
            <section id="registration" className="hidden lg:block">
              <EventRegistration event={event} />
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-20">
              {/* Registration (only visible for mobile on this page) */}
              <div className="lg:hidden">
                <section id="mobile-registration">
                  <EventRegistration event={event} />
                </section>
              </div>

              {/* Contact and Share */}
              <EventContactShare event={event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
