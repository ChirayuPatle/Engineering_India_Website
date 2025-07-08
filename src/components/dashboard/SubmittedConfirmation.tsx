"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function SubmittedConfirmation() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
        <div>
          <h3 className="font-semibold text-green-800 dark:text-green-300">
            Membership Form Submitted
          </h3>
          <p className="text-sm text-green-700 dark:text-green-400/80">
            Thank you for your interest! We have received your application.
          </p>
        </div>
      </div>
      <Button asChild variant="outline" size="sm">
        <Link href="/team">Meet the Team</Link>
      </Button>
    </div>
  );
}
