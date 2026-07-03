"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { useCurrentUser } from "@/hooks/use-user";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Feedback() {
  const { data: user } = useCurrentUser();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormState((prevState) => ({
        ...prevState,
        name: user.name ?? "",
        email: user.email ?? "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Failed to submit feedback.");
        return;
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormState({
          name: user?.name ?? "",
          email: user?.email ?? "",
          message: "",
        });
      }, 3000);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <Typography
              variant="h2"
              className="mb-4 text-3xl font-bold text-zinc-700 md:text-4xl"
            >
              Share Your Feedback
            </Typography>
            <Typography className="text-muted-foreground">
              We value your opinions and suggestions. Let us know how we can
              improve our club activities.
            </Typography>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Feedback Form</CardTitle>
              <CardDescription>
                Your feedback helps us improve our events and activities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                  <h3 className="mb-2 text-xl font-medium">Thank You!</h3>
                  <p className="text-center text-muted-foreground">
                    Your feedback has been submitted successfully. We appreciate
                    your input!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="rounded-md bg-red-100 p-3 text-red-600">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Share your thoughts, suggestions, or experiences with our club"
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          message: e.target.value,
                        })
                      }
                      required
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Submit Feedback"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
