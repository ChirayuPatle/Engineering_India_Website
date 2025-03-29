"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useUser } from "@/context/userContext";
import { siteConfig } from "@/lib/constants";
import { Mail, MapPin, Phone, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const { user } = useUser();
  const [formState, setFormState] = useState({
    name: user?.name,
    email: user?.email,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Call the API endpoint to submit feedback
      const res = await fetch("/api/v1/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to submit feedback.");
        return;
      }

      // Show the thank-you message
      setSubmitted(true);

      // Reset the form after a short delay
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", message: "" });
      }, 3000);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="container mx-auto mt-[6rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Typography variant="h1" className="mb-6">
              Contact Us
            </Typography>
            <Typography className="mb-8 text-muted-foreground">
              Have questions about {siteConfig.name}? We'd love to hear from
              you. Send us a message and we'll respond as soon as possible.
            </Typography>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <Typography variant="h4">Location</Typography>
                  <Typography className="text-muted-foreground">
                    Yeshwantrao Chavan College Of Engineering, Wanadongri,
                    Nagpur
                  </Typography>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <Typography variant="h4">Email</Typography>
                  <Typography className="text-muted-foreground">
                    engineeringindia047@gmail.com
                  </Typography>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <Typography variant="h4">Phone</Typography>
                  <Typography className="text-muted-foreground">
                    (+91) 96236 12124 & (+91) 7066562938
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                <h3 className="mb-2 text-xl font-medium">Thank You!</h3>
                <p className="text-center text-muted-foreground">
                  Your message has been submitted successfully. We appreciate
                  your input!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="rounded-md bg-red-100 p-3 text-red-600">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                    className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
