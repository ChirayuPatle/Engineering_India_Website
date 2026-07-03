"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { DynamicRegistrationForm } from "@/components/events/DynamicRegistrationForm";

interface Event {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  category?: string;
}

export default function EventRegistrationPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const eventSlug = Array.isArray(slug) ? slug[0] : slug;
        const response = await fetch(`/api/event?id=${eventSlug || ""}`);

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const data = await response.json();

        if (data.events && data.events.length > 0) {
          setEvent(data.events[0]);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  const handleRegistrationSuccess = () => {
    // Redirect to dashboard or show success message
    router.push("/dashboard/registrations");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading registration form...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl text-red-600">❌</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Event Not Found
          </h2>
          <p className="mb-6 text-gray-600">
            {error ||
              "The event you're trying to register for could not be found."}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-gray-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button
              onClick={() => router.push("/events")}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Browse Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Event Registration
              </h1>
              <p className="mt-0.5 text-sm text-gray-600">{event.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <DynamicRegistrationForm
            eventId={slug as string}
            eventName={event.name}
            onSuccess={handleRegistrationSuccess}
          />
        </div>
      </div>
    </div>
  );
}
