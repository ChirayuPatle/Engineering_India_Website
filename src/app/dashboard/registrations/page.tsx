"use client";

import { ArrowLeft, Inbox, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RegistrationCard, {
  type Registration,
} from "@/components/dashboard/RegistrationCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";

function RegistrationCardSkeleton() {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="mt-4 flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

export default function RegistrationsPage() {
  const router = useRouter();

  const {
    data: registrations = [],
    status,
    isFetching,
  } = useQuery<Registration[]>({
    queryKey: ["registrations"],
    queryFn: async () => {
      const res = await api.get<Registration[]>("/user/registrations");
      return res.data || [];
    },
    retry: false, // Don't retry endlessly on server errors
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
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          My Registrations
        </h1>
      </div>

      {status === "pending" || isFetching ? (
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <RegistrationCardSkeleton key={i} />
          ))}
        </div>
      ) : status === "error" ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-400 bg-red-50 p-6 text-center text-red-700 shadow-sm">
          <TriangleAlert className="mb-4 h-12 w-12 text-red-500" />
          <span className="text-xl font-semibold">
            Error loading registrations.
          </span>
          <p className="mt-2 text-sm">
            We couldn't load your registrations. Please try again later.
          </p>
        </div>
      ) : registrations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <Inbox className="mb-6 h-16 w-16 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">
            No Registrations Yet
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            You haven't registered for any events yet. Once you do, they'll show
            up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {registrations.map((reg) => (
            <RegistrationCard reg={reg} key={reg.id} />
          ))}
        </div>
      )}
    </div>
  );
}
