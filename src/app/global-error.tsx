"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
          <div className="container max-w-md space-y-6 p-6 text-center">
            <h1 className="text-4xl font-bold text-destructive">
              Something went wrong!
            </h1>
            <p className="text-muted-foreground">
              We apologize for the inconvenience. An unexpected error has
              occurred.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="default" onClick={() => reset()}>
                Try again
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                Go home
              </Button>
            </div>
            {process.env.NODE_ENV === "development" && (
              <div className="mt-4 rounded-lg bg-muted p-4 text-left">
                <p className="text-sm text-muted-foreground">{error.message}</p>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
