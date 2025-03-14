"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { PaymentCard } from "@/components/dashboard/PaymentCard";
import { useState, useEffect } from "react";
import { Calendar, CreditCard, Loader2 } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import {
  useUser,
  type UserEvent,
  type UserPayment,
} from "@/context/userContext";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<UserEvent[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<UserEvent[]>([]);
  const [attendedEvents, setAttendedEvents] = useState<UserEvent[]>([]);
  const [recentPayments, setRecentPayments] = useState<UserPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  // New state for current date/time and a random quote
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Define some quotes
    const quotes = [
      "Believe you can and you're halfway there.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Every moment is a fresh beginning.",
      "Your only limit is you.",
      "Do something today that your future self will thank you for.",
    ];
    // Pick a random quote on mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex] ?? quotes[0] ?? "";
    setQuote(selectedQuote);
    // Update current date/time every second
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      setIsLoading(true);
      try {
        // Fetch user registrations with event details
        const { data: registrations, error: registrationsError } =
          await supabase
            .from("registrations")
            .select(
              `
            registration_id,
            registration_attended,
            registration_created_at,
            registration_ticket,
            events:registration_event_id (
              event_id,
              event_title,
              event_category,
              event_venue,
              event_start_date,
              event_image,
              registration_fee
            )
          `,
            )
            .eq("registration_user_id", user.id);

        if (registrationsError) throw registrationsError;

        // Process registrations into events and payments
        const allRegisteredEvents: UserEvent[] = [];
        const allAttendedEvents: UserEvent[] = [];
        const paymentsData: UserPayment[] = [];

        registrations?.forEach((registration) => {
          const eventData = registration.events as any;
          if (!eventData) return; // Skip if event data is missing

          const event: UserEvent = {
            id: eventData.event_id,
            title: eventData.event_title,
            date: new Date(eventData.event_start_date).toLocaleDateString(),
            time: new Date(eventData.event_start_date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            category: eventData.event_category,
            location: eventData.event_venue,
            image: eventData.event_image,
            attended: !!registration.registration_attended,
          };

          allRegisteredEvents.push(event);
          if (registration.registration_attended) {
            allAttendedEvents.push(event);
          }

          if (eventData.registration_fee > 0) {
            paymentsData.push({
              id: registration.registration_id,
              eventName: eventData.event_title,
              amount: eventData.registration_fee,
              date: new Date(
                registration.registration_created_at,
              ).toLocaleDateString(),
              status: "paid", // Assuming paid since they registered
              transactionId: registration.registration_ticket.substring(0, 8),
            });
          }
        });

        // Fetch upcoming events (future events)
        const currentISO = new Date().toISOString();
        const { data: upcoming, error: upcomingError } = await supabase
          .from("events")
          .select("*")
          .gte("event_start_date", currentISO)
          .order("event_start_date", { ascending: true })
          .limit(5);

        if (upcomingError) throw upcomingError;

        const formattedUpcoming: UserEvent[] =
          upcoming?.map((event) => ({
            id: event.event_id,
            title: event.event_title,
            date: new Date(event.event_start_date).toLocaleDateString(),
            time: new Date(event.event_start_date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            category: event.event_category,
            location: event.event_venue,
            image: event.event_image,
            attended: false, // Upcoming events haven't been attended yet
          })) || [];

        // Update state with fetched data
        setRegisteredEvents(allRegisteredEvents);
        setAttendedEvents(allAttendedEvents);
        setRecentPayments(paymentsData);
        setUpcomingEvents(formattedUpcoming);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-lg text-gray-500">
          Loading your dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top row cards: responsive grid */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="hidden flex-col items-center justify-center rounded-lg border bg-card p-4 md:flex">
          <p className="text-lg font-bold text-gray-700">
            {currentDate.toLocaleDateString()}{" "}
            {currentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="mt-2 px-2 text-center text-sm text-gray-500">
            "{quote}"
          </p>
          <Badge variant="secondary" className="mt-1">
            Stay tuned!
          </Badge>
        </div>
        <StatCard
          title="Events Attended"
          value={attendedEvents.length.toString()}
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Registered Events"
          value={registeredEvents.length.toString()}
          icon={<CreditCard className="h-4 w-4" />}
        />
      </div>

      <UpcomingEvents
        events={upcomingEvents}
        onViewAll={() => router.push("/dashboard/events")}
      />

      {registeredEvents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Your Registered Events</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {registeredEvents.map((event) => (
              <div key={event.id} className="rounded-lg border bg-card p-4">
                {event.image && (
                  <div className="mb-2 h-32 w-full overflow-hidden rounded-md">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-500">
                  {event.date} at {event.time}
                </p>
                <p className="text-sm text-gray-500">
                  {event.location} • {event.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentPayments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recent Payments</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recentPayments.map((payment) => (
              <PaymentCard key={payment.id} {...payment} />
            ))}
          </div>
        </div>
      )}

      {!registeredEvents.length && !recentPayments.length && (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border bg-neutral-50 p-6 text-center">
          <h3 className="text-lg font-medium">No event registrations yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Browse events and register to see them appear on your dashboard.
          </p>
          <button
            onClick={() => router.push("/dashboard/events")}
            className="mt-4 rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-600"
          >
            Browse Events
          </button>
        </div>
      )}
    </div>
  );
}
