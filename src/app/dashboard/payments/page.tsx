"use client";

interface Payment {
  id: string;
  eventName: string;
  date: string;
  amount: number;
  status: string;
  transactionId: string;
}

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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

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
    data: payments,
    isLoading,
    isError,
    error,
  } = useQuery<Payment[]>({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get<Payment[]>("/api/user/payments");
      return res.data;
    },
  });

  const filteredPayments =
    payments?.filter(
      (payment) => statusFilter === "all" || payment.status === statusFilter,
    ) ?? [];

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

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <PaymentCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center text-red-500">
          Failed to load payments:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}

      {/* Payment Cards */}
      {!isLoading && !isError && (
        <>
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
                <h3 className="mt-2 text-xl font-semibold">
                  No payments found
                </h3>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
