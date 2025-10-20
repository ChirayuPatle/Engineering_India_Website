"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { PaymentCard } from "@/components/dashboard/PaymentCard";
import { HackathonRegistrationCard } from "@/components/dashboard/HackathonRegistrationCard";
import { EventCard } from "@/components/dashboard/EventCard";
import {
  Calendar,
  CreditCard,
  TriangleAlert,
  CheckCircle,
  Trophy,
} from "lucide-react";
import { type PaymentStatus } from "@/components/dashboard/PaymentCard";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { type User } from "@/types";

export interface Payment {
  id: string;
  eventName: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  transactionId: string;
  isHackathon?: boolean; // Flag to identify hackathon payments
}

interface Registration {
  id: string;
  eventId: string;
  userId: string;
  createdAt: string;
  event: {
    id: string;
    title: string;
    description: string | null;
    startDate: string;
    venue: string | null;
    category: string | null;
    price: number;
  };
}

interface DashboardResponse {
  registeredEvents?: Registration[];
  payments?: Payment[];
  user?: User;
  membership?: {
    hasSubmitted: boolean;
  };
  stats?: {
    totalRegistrations: number;
    totalEventsAvailable: number;
    eventRegistrations: number;
    hackathonRegistrations: number;
  };
}

const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const res = await fetch("/api/user/dashboard");
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data.");
  }
  return (await res.json()) as DashboardResponse;
};

const fetchHackathonRegistration = async (): Promise<any> => {
  const res = await fetch("/api/hackathon/my-registration");
  if (!res.ok) {
    if (res.status === 401) return null;
    throw new Error("Failed to fetch hackathon registration.");
  }
  const data = (await res.json()) as { registration: any };
  return data.registration;
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const DashboardSkeleton = () => (
  <div className="flex flex-col space-y-4 px-4 sm:space-y-6 sm:px-0">
    <Skeleton className="h-8 w-48 sm:w-64" />
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
      <Skeleton className="h-24 w-full sm:w-1/2" />
      <Skeleton className="h-24 w-full sm:w-1/2" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-6 w-40 sm:w-48" />
      <Skeleton className="h-32 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-6 w-40 sm:w-48" />
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  const { data: hackathonRegistration, isLoading: isLoadingHackathon } =
    useQuery({
      queryKey: ["hackathonRegistration"],
      queryFn: fetchHackathonRegistration,
    });

  const userName = data?.user?.name ?? "User";
  const registeredEvents = data?.registeredEvents ?? [];
  const payments = data?.payments ?? [];
  const stats = data?.stats ?? {
    totalRegistrations: 0,
    totalEventsAvailable: 0,
    eventRegistrations: 0,
    hackathonRegistrations: 0,
  };

  // Debug logging
  console.log("Dashboard data:", data);
  console.log("Stats:", stats);
  console.log("Registered Events:", registeredEvents);
  console.log("Hackathon Registration:", hackathonRegistration);

  const greeting = useMemo(() => getGreeting(), []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="mx-4 sm:mx-0">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-400 bg-red-50 p-6 text-center text-red-700 shadow-sm sm:p-8">
          <TriangleAlert className="mb-4 h-10 w-10 text-red-500 sm:h-12 sm:w-12" />
          <span className="text-lg font-semibold sm:text-xl">
            Error loading dashboard data.
          </span>
          <p className="mt-2 text-xs sm:text-sm">
            We couldn't load your dashboard. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 sm:px-0">
      <div className="w-full flex-1 justify-between space-y-4 sm:space-y-6">
        {/* 👋 Greeting */}
        <div className="break-words text-xl font-semibold sm:text-2xl lg:text-3xl">
          👋 {greeting}, <span className="text-primary">{userName}</span>!
        </div>

        {/* Stats */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
          <StatCard
            title="Total Events"
            value={String(stats.totalEventsAvailable)}
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard
            title="My Registrations"
            value={String(stats.totalRegistrations)}
            icon={<CheckCircle className="h-4 w-4" />}
          />
        </div>

        {/* Hackathon Registration */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg font-bold sm:text-xl">
            Hackathon Registration
          </h2>
          {isLoadingHackathon ? (
            <Skeleton className="h-64 w-full" />
          ) : hackathonRegistration ? (
            <div className="w-full sm:max-w-md lg:max-w-lg">
              <HackathonRegistrationCard registration={hackathonRegistration} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-muted bg-muted/50 p-4 text-center text-muted-foreground shadow-sm sm:p-6">
              <div className="mb-2 text-3xl sm:text-4xl">🚀</div>
              <span className="text-base font-semibold sm:text-lg">
                Not registered for hackathon yet
              </span>
              <p className="mt-1 text-xs sm:text-sm">
                Register your team to participate in the hackathon!
              </p>
            </div>
          )}
        </div>

        {/* Registered Events */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg font-bold sm:text-xl">
            Your Registered Events
          </h2>
          {registeredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
              {registeredEvents.map((registration) => (
                <EventCard
                  key={registration.id}
                  id={registration.event.id}
                  title={registration.event.title}
                  description={registration.event.description || ""}
                  start_date={new Date(
                    registration.event.startDate,
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  venue={registration.event.venue || "TBA"}
                  category={registration.event.category || "General"}
                  price={registration.event.price}
                  isRegistered={true}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-muted bg-muted/50 p-4 text-center text-muted-foreground shadow-sm sm:p-6">
              <div className="mb-2 text-3xl sm:text-4xl">📝</div>
              <span className="text-base font-semibold sm:text-lg">
                No registered events found
              </span>
              <p className="mt-1 text-xs sm:text-sm">
                Register for events to see them here!
              </p>
            </div>
          )}
        </div>

        {/* Payments */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg font-bold sm:text-xl">Recent Payments</h2>
          {payments.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
              {payments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  id={payment.id}
                  eventName={payment.eventName}
                  amount={payment.amount}
                  date={new Date(payment.date).toLocaleDateString("en-GB")}
                  status={payment.status}
                  transactionId={payment.transactionId}
                  isHackathon={payment.isHackathon}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-muted bg-muted/50 p-4 text-center text-muted-foreground shadow-sm sm:p-6">
              <div className="mb-2 text-3xl sm:text-4xl">💸</div>
              <span className="text-base font-semibold sm:text-lg">
                No recent payments found
              </span>
              <p className="mt-1 text-xs sm:text-sm">
                Your payment history will appear here after transactions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
