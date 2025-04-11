"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { PaymentCard } from "@/components/dashboard/PaymentCard";
import { Calendar, CreditCard } from "lucide-react";
import { type PaymentStatus } from "@/components/dashboard/PaymentCard";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useCurrentUser } from "@/hooks/use-user";

export interface Payment {
  id: string;
  eventName: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  transactionId: string;
}

interface Event {
  id: string;
  title: string;
  startDate: string;
  time?: string;
  category?: string;
  location?: string;
}

interface Registration {
  id: string;
  eventId: string;
  userId: string;
  createdAt: string;
}

interface DashboardResponse {
  registeredEvents?: Registration[];
  upcomingEvents?: Event[];
  payments?: Payment[];
}

const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const res = await fetch("/api/user/dashboard");
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data.");
  }
  const data = await res.json();
  return data as DashboardResponse;
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    // error removed to fix unused variable warning
  } = useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useCurrentUser();

  const userName = userData?.name ?? "User";
  const registeredEvents = data?.registeredEvents ?? [];
  const upcomingEvents = data?.upcomingEvents ?? [];
  const payments = data?.payments ?? [];

  const greeting = useMemo(() => getGreeting(), []);

  if (isLoading || userLoading) {
    return (
      <div className="text-center text-gray-500">Loading your dashboard...</div>
    );
  }

  if (isError || userError) {
    return <div className="text-center text-red-500">Error loading data.</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex-1 justify-between space-y-6">
        {/* 👋 Greeting */}
        <div className="text-2xl font-semibold">
          👋 {greeting}, <span className="text-primary">{userName}</span>!
        </div>

        {/* Stats */}
        <div className="flex w-full gap-4">
          <StatCard
            title="Events Attended"
            value={String(registeredEvents.length)}
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard
            title="Registered Events"
            value={String(registeredEvents.length)}
            icon={<CreditCard className="h-4 w-4" />}
          />
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="mb-2 text-xl font-bold">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <UpcomingEvents
              events={upcomingEvents.map((e) => ({
                id: e.id,
                title: e.title,
                date: new Date(e.startDate).toLocaleDateString(),
                time: new Date(e.startDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                category: e.category ?? "General",
                location: e.location ?? "TBD",
              }))}
              onViewAll={() => router.push("/events")}
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-muted bg-muted/50 p-6 text-center text-muted-foreground shadow-sm">
              🎉{" "}
              <span className="text-lg font-semibold">
                No upcoming events right now
              </span>
              <p className="mt-1 text-sm">
                Stay tuned for some amazing events coming your way!
              </p>
            </div>
          )}
        </div>

        {/* Payments */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recent Payments</h2>
          {payments.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {payments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  id={payment.id}
                  eventName={payment.eventName}
                  amount={payment.amount}
                  date={new Date(payment.date).toLocaleDateString()}
                  status={payment.status}
                  transactionId={payment.transactionId}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-muted bg-muted/50 p-6 text-center text-muted-foreground shadow-sm">
              💸{" "}
              <span className="text-lg font-semibold">
                No recent payments found
              </span>
              <p className="mt-1 text-sm">
                Your payment history will appear here after transactions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
