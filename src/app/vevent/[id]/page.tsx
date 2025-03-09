"use client";

import { useState, useEffect } from 'react';
import { getEventById } from '@/lib/event-mock-data';
import { type Event } from '@/context/eventContext';
// import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

import EventHeader from '@/components/vevents/EventHeader';
import EventDescription from '@/components/vevents/EventDescription';
import EventSchedule from '@/components/vevents/EventSchedule';
import EventPrizes from '@/components/vevents/EventPrizes';
import EventGallery from '@/components/vevents/EventGallery';
import EventFAQ from '@/components/vevents/EventFAQ';
import EventRegistration from '@/components/vevents/EventRegistration';
import EventNavigation from '@/components/vevents/EventNavigation';
import EventContactShare from '@/components/vevents/EventContactShare';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const EventPage = () => {
  const { id = '1' } = useParams<{ id: string }>();
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
      } catch (err:any) {
        setError('Failed to load event details.');
        // toast({
        //   title: 'Error',
        //   description: 'Could not load event details. Please try again later.',
        //   variant: 'destructive',
        // });
        alert(`Error fetching event: ${err}`);
        console.error('Error fetching event:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="event-container min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-black" />
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="event-container min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
          <Link href="/" className="text-black hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-8">
      {/* Full-width header section */}
      <EventHeader event={event} />
      
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Navigation */}
        <EventNavigation className="mb-6 md:mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-8">
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
            <div className="lg:sticky lg:top-20 space-y-6">
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
