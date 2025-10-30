"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HackathonRegistrationPage() {
  const router = useRouter();

  // Registrations are closed - show message and redirect
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/events/hackathon");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 p-4 sm:p-6">
      <Card className="w-full max-w-lg border-red-500 shadow-xl">
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-6 text-center">
            {/* Closed Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <AlertCircle className="h-12 w-12 text-white" />
            </div>

            {/* Closed Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Registrations Closed
              </h2>
              <p className="text-sm text-gray-600 sm:text-base">
                Hackathon registrations are now closed. Thank you for your
                interest!
              </p>
            </div>

            {/* Additional Info */}
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-gray-700">
                We're no longer accepting new registrations for the Prarambh
                Hackathon 2025. Stay tuned for future events and opportunities!
              </p>
            </div>

            {/* Redirecting Message */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin text-red-600" />
              <span>Redirecting to event page...</span>
            </div>

            {/* Manual Navigation Button */}
            <Button
              onClick={() => router.push("/events/hackathon")}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              Go to Event Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
