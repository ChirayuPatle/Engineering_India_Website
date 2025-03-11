"use client";

import {
  PaymentCard,
  type PaymentStatus,
} from "@/components/dashboard/PaymentCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const payments = [
  {
    id: "p1",
    eventName: "Tech Expo 2023",
    date: "Oct 10, 2023",
    amount: 25,
    status: "paid",
    transactionId: "TRX123456",
  },
  {
    id: "p2",
    eventName: "Coding Workshop",
    date: "Oct 18, 2023",
    amount: 15,
    status: "pending",
    transactionId: "TRX234567",
  },
  {
    id: "p3",
    eventName: "Entrepreneurship Panel",
    date: "Nov 1, 2023",
    amount: 10,
    status: "failed",
    transactionId: "TRX345678",
  },
  {
    id: "p4",
    eventName: "Game Development Workshop",
    date: "Sep 15, 2023",
    amount: 20,
    status: "paid",
    transactionId: "TRX456789",
  },
];

export default function PaymentsPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = payments.filter(
    (payment) => statusFilter === "all" || payment.status === statusFilter,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredPayments.length} payment
          {filteredPayments.length !== 1 ? "s" : ""}
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPayments.map((payment) => (
          <PaymentCard
            key={payment.id}
            id={payment.id}
            eventName={payment.eventName}
            date={payment.date}
            amount={payment.amount}
            status={payment.status as PaymentStatus}
            transactionId={payment.transactionId}
            onViewDetails={() =>
              router.push(`/dashboard/payments/${payment.id}`)
            }
          />
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center text-center">
            <h3 className="mt-2 text-xl font-semibold">No payments found</h3>
            <p className="text-sm text-muted-foreground">
              Try changing your filters
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
