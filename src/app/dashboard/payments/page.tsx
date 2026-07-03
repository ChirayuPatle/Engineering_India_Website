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
import { ArrowLeft, Inbox, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";

interface Payment {
  id: string;
  eventName: string;
  date: string;
  amount: number;
  status: string;
  transactionId: string;
  paymentScreenshot?: string | null;
  isHackathon?: boolean;
}

function PaymentCardSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

export default function PaymentsPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: payments = [],
    status,
    isFetching,
  } = useQuery<Payment[]>({
    queryKey: ["payments", statusFilter],
    queryFn: async () => {
      const res = await api.get<Payment[]>("/user/payments", {
        params: { status: statusFilter !== "all" ? statusFilter : undefined },
      });
      return res.data || [];
    },
    retry: false,
  });

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
          Showing {payments.length} payment{payments.length !== 1 ? "s" : ""}
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
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {status === "pending" || isFetching ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <PaymentCardSkeleton key={i} />
          ))}
        </div>
      ) : payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <Inbox className="mb-6 h-16 w-16 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">
            No Payments Yet
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            You haven't made any payments yet. Once you do, they'll show up
            here.
          </p>
        </div>
      ) : status === "error" ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-400 bg-red-50 p-6 text-center text-red-700 shadow-sm">
          <TriangleAlert className="mb-4 h-12 w-12 text-red-500" />
          <span className="text-xl font-semibold">Error loading payments.</span>
          <p className="mt-2 text-sm">
            We couldn't load your payment history. Please try again later.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment) => (
            <PaymentCard
              key={payment.id}
              id={payment.id}
              eventName={payment.eventName}
              date={payment.date}
              amount={payment.amount}
              status={payment.status as PaymentStatus}
              transactionId={payment.transactionId}
              paymentScreenshot={payment.paymentScreenshot}
              isHackathon={payment.isHackathon}
              onViewDetails={() =>
                router.push(`/dashboard/payments/${payment.id}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
