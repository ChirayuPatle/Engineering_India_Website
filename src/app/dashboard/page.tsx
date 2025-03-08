"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { PaymentCard } from "@/components/dashboard/PaymentCard";
import { useState } from "react";
import { Calendar, CreditCard, MessageSquare } from "lucide-react";

import { type PaymentStatus } from "@/components/dashboard/PaymentCard";

export interface Payment {
  id: string;
  eventName: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  transactionId: string;
}

const mockRecentPayments: Payment[] = [
  {
    id: "1",
    eventName: "Tech Expo 2023",
    amount: 25,
    date: "2023-10-10",
    status: "paid" as PaymentStatus,
    transactionId: "tx_001",
  },
  {
    id: "2",
    eventName: "Coding Workshop",
    amount: 15,
    date: "2023-10-20",
    status: "paid" as PaymentStatus,
    transactionId: "tx_002",
  },
];

// Example data for upcoming events
const mockUpcomingEvents = [
  {
    id: "1",
    title: "Tech Expo 2023",
    date: "2023-10-10",
    time: "10:00 AM",
    category: "Tech",
    location: "Virtual",
  },
  {
    id: "2",
    title: "Coding Workshop",
    date: "2023-10-20",
    time: "2:00 PM",
    category: "Workshop",
    location: "Mumbai",
  },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="w-full flex-1 justify-between space-y-6">
        <div className="flex w-full gap-4">
          <StatCard
            title="Events Attended"
            value="5"
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard
            title="Registered Events"
            value="10"
            icon={<CreditCard className="h-4 w-4" />}
          />
        </div>

        <UpcomingEvents
          events={mockUpcomingEvents}
          onViewAll={() => console.log("View all events clicked")}
        />
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recent Payments</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {mockRecentPayments.map((payment) => (
              <PaymentCard key={payment.id} {...payment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
