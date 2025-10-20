"use client";

import { ArrowLeft, Inbox, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RegistrationCard, {
  type Registration,
} from "@/components/dashboard/RegistrationCard";
import { HackathonRegistrationCard } from "@/components/dashboard/HackathonRegistrationCard";
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

const fetchHackathonRegistration = async (): Promise<any> => {
  const res = await fetch("/api/hackathon/my-registration");
  if (!res.ok) {
    if (res.status === 401) return null;
    throw new Error("Failed to fetch hackathon registration.");
  }
  const data = (await res.json()) as { registration: any };
  return data.registration;
};

export default function RegistrationsPage() {
  const router = useRouter();

  const {
    data: allRegistrations = [],
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

  const { data: hackathonRegistration, isLoading: isLoadingHackathon } =
    useQuery({
      queryKey: ["hackathonRegistration"],
      queryFn: fetchHackathonRegistration,
    });

  // Filter out hackathon registrations from the list (they'll be shown separately)
  const eventRegistrations = allRegistrations.filter(
    (reg) => reg.type !== "hackathon",
  );

  const hasHackathon = !!hackathonRegistration;
  const hasEvents = eventRegistrations.length > 0;

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

      {status === "pending" || isFetching || isLoadingHackathon ? (
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
      ) : !hasHackathon && !hasEvents ? (
        <div className="space-y-6">
          {/* No registrations message */}
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
            <Inbox className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">
              No Registrations Yet
            </h3>
            <p className="mt-2 max-w-md text-sm text-gray-600">
              You haven't registered for any events yet. Check out upcoming
              events and hackathons!
            </p>
            <div className="mt-4 flex gap-3">
              <Button onClick={() => router.push("/events")} variant="outline">
                Browse Events
              </Button>
              <Button
                onClick={() => router.push("/events/hackathon")}
                className="bg-black hover:bg-gray-900"
              >
                View Hackathon
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Hackathon Registration Section */}
          {hasHackathon && (
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">
                Hackathon Registration
              </h2>
              <div className="w-full sm:max-w-md lg:max-w-lg">
                <HackathonRegistrationCard
                  registration={hackathonRegistration}
                />
              </div>
            </div>
          )}

          {/* Event Registrations Section */}
          {hasEvents && (
            <div className="space-y-3">
              {hasHackathon && (
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-200"></div>
                  <p className="text-sm font-semibold text-gray-600">
                    Event Registrations
                  </p>
                  <div className="h-px flex-1 bg-gray-200"></div>
                </div>
              )}
              {!hasHackathon && (
                <h2 className="text-xl font-bold text-gray-900">
                  Event Registrations
                </h2>
              )}
              <div className="grid gap-6">
                {eventRegistrations.map((reg) => (
                  <RegistrationCard reg={reg} key={reg.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
