"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-user";
import { membershipFormSchema, type MembershipFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const interests = [
  "Technical",
  "Designing",
  "Literature",
  "Communication & Publicity",
  "Videography & Photography",
  "Database",
  "Event Management",
];

const branches = [
  "CSD",
  "CSE",
  "AIDS",
  "Mechanical",
  "Civil",
  "Electrical",
  "C.Tech",
  "IT",
  "AIML",
  "IOT",
  "VLSI",
  "ETC",
];

const years = ["1", "2", "3", "4"];

export default function MembershipForm() {
  const { data: user } = useCurrentUser();

  const form = useForm<MembershipFormSchema>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      name: "",
      year: "",
      branch: "",
      email: "",
      areaOfInterest: [],
      engagedInOtherClub: false,
      previousExperience: "",
      reasonToJoin: "",
      eventIdeas: "",
    },
  });

  const { data: status, isFetching } = useQuery({
    queryKey: ["membership-status"],
    queryFn: async (): Promise<{ hasSubmitted: boolean }> => {
      const res = await fetch("/api/membership-form/status");
      if (!res.ok) throw new Error("Failed to check status");
      return res.json() as Promise<{ hasSubmitted: boolean }>;
    },
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();
  const { mutate: submitForm, isPending } = useMutation({
    mutationFn: async (values: MembershipFormSchema): Promise<Response> => {
      const res = await fetch("/api/membership-form", {
        method: "POST",
        body: JSON.stringify(values),
      });
      console.log("\n\nRESPONSE :- ", res);
      if (!res.ok) throw new Error("Submission failed");
      return res;
    },
    onSuccess: () => {
      toast.success("Form submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["membership-status"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        year: user.year || "",
        branch: user.branch || "",
        email: user.email || "",
        areaOfInterest: [],
        engagedInOtherClub: false,
        previousExperience: "",
        reasonToJoin: "",
        eventIdeas: "",
      });
    }
  }, [user, form]);

  if (isFetching || !user) {
    return (
      <div className="mx-auto mt-10 max-w-xl space-y-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-6 animate-pulse rounded bg-muted" />
        ))}
        <div className="h-20 animate-pulse rounded bg-muted" />
        <div className="h-10 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (status?.hasSubmitted) {
    return (
      <div className="mx-auto mt-10 max-w-full space-y-6 rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center sm:px-10 md:max-w-2xl">
        <p className="text-2xl font-bold text-green-700 sm:text-3xl">
          🎉 Thank you for submitting your membership form!
        </p>
        <p className="text-base text-green-600 sm:text-lg">
          We're excited to have you join our community. Please join our WhatsApp
          group to stay updated on all our activities and events.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button
            asChild
            variant="outline"
            className="w-full border-green-400 text-green-800 hover:bg-green-100"
          >
            <a
              href="https://chat.whatsapp.com/YOUR_WHATSAPP_GROUP_LINK" // Placeholder
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-whatsapp"
              >
                <path d="M17.4 17.6a6.8 6.8 0 0 1-8.8 0l-4.9 4.9a2 2 0 0 1-2.8 0A2 2 0 0 1 2 20.4l4.9-4.9a6.8 6.8 0 0 1 0-8.8c.9-.9 2.1-1.4 3.4-1.4h.3c1.3 0 2.6.5 3.5 1.4a6.8 6.8 0 0 1 0 8.8z" />
                <path d="m19 19-1.5-1.5" />
                <path d="M17.4 17.6a6.8 6.8 0 0 1-8.8 0l-4.9 4.9a2 2 0 0 1-2.8 0A2 2 0 0 1 2 20.4l4.9-4.9a6.8 6.8 0 0 1 0-8.8c.9-.9 2.1-1.4 3.4-1.4h.3c1.3 0 2.6.5 3.5 1.4a6.8 6.8 0 0 1 0 8.8z" />
                <path d="m19 19-1.5-1.5" />
              </svg>
              WhatsApp Group
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-green-400 text-green-800 hover:bg-green-100"
          >
            <a
              href="https://instagram.com/YOUR_INSTAGRAM_LINK" // Placeholder
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
              </svg>
              Instagram
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-green-400 text-green-800 hover:bg-green-100"
          >
            <a
              href="https://linkedin.com/company/YOUR_LINKEDIN_LINK" // Placeholder
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit((values) => submitForm(values))}
      className="mx-auto mt-10 max-w-xl space-y-6 rounded-xl border border-border p-6"
    >
      <h2 className="mb-4 text-2xl font-semibold">Membership Drive Form</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Name</Label>
          <Input {...form.register("name")} disabled />
        </div>

        <div className="space-y-1">
          <Label>Year *</Label>
          <Select
            onValueChange={(value) => form.setValue("year", value)}
            value={form.watch("year")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Branch *</Label>
          <Select
            onValueChange={(value) => form.setValue("branch", value)}
            value={form.watch("branch")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 space-y-1">
          <Label>Email</Label>
          <Input {...form.register("email")} disabled />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Area of Interest (Priority order) *</Label>
        <p className="text-sm text-muted-foreground">
          Select up to 6 preferences in order of priority
        </p>
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <Select
                onValueChange={(value) => {
                  const current = [...(form.getValues("areaOfInterest") || [])];
                  current[index] = value;
                  form.setValue("areaOfInterest", current);
                }}
                value={form.watch("areaOfInterest")[index] || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select Preference ${index + 1}`} />
                </SelectTrigger>
                <SelectContent>
                  {interests
                    .filter((interest) => {
                      const allSelected = form.watch("areaOfInterest") || [];
                      const selectedInOther = allSelected.filter(
                        (_, i) => i !== index,
                      );
                      return !selectedInOther.includes(interest);
                    })
                    .map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Are you engaged in any other clubs? *</Label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={form.watch("engagedInOtherClub") === true}
              onChange={() => form.setValue("engagedInOtherClub", true)}
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={form.watch("engagedInOtherClub") === false}
              onChange={() => form.setValue("engagedInOtherClub", false)}
            />
            <span>No</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Previous Experience (Optional)</Label>
        <Textarea
          {...form.register("previousExperience")}
          placeholder="Share your experience"
        />
      </div>

      <div className="space-y-2">
        <Label>Why are you interested to join the club? *</Label>
        <Textarea
          {...form.register("reasonToJoin")}
          placeholder="Express your motivation"
        />
      </div>

      <div className="space-y-2">
        <Label>Suggest some event ideas (Optional)</Label>
        <Textarea
          {...form.register("eventIdeas")}
          placeholder="We'd love to hear your suggestions"
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit Form"}
      </Button>
    </form>
  );
}
