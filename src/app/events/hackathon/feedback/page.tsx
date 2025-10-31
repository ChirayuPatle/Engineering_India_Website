"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Star,
  StarOff,
  ArrowLeft,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface FeedbackFormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  overallRating: number;
  experienceRating: number;
  organizationRating: number;
  suggestions?: string;
  venueRating?: number;
  mentorshipRating?: number;
}

function StarRating({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-gray-900">{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110"
          >
            {star <= value ? (
              <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-8 w-8 text-gray-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HackathonFeedbackPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Get current user data
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormData>();

  const overallRating = watch("overallRating");
  const experienceRating = watch("experienceRating");
  const organizationRating = watch("organizationRating");
  const venueRating = watch("venueRating");
  const mentorshipRating = watch("mentorshipRating");

  // Autofill user data when component mounts
  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) {
        setValue("name", currentUser.name);
      }
      if (currentUser.email) {
        setValue("email", currentUser.email);
      }
      if (currentUser.phone) {
        setValue("phone", currentUser.phone);
      }
      if (currentUser.collegeName) {
        setValue("college", currentUser.collegeName);
      }
      if (currentUser.branch) {
        setValue("branch", currentUser.branch);
      }
      if (currentUser.year) {
        setValue("year", currentUser.year);
      }
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/hackathon/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Feedback submission failed");
      }

      setSubmitSuccess(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/events/hackathon");
      }, 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 sm:p-6">
        <Card className="w-full max-w-lg border-green-500 shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6 text-center">
              {/* Success Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  🎉 Thank You!
                </h2>
                <p className="text-sm text-gray-600 sm:text-base">
                  Your feedback has been submitted successfully. We appreciate
                  your valuable input!
                </p>
              </div>

              {/* Redirecting Message */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Redirecting to event page...</span>
              </div>

              {/* Manual Navigation Button */}
              <Button
                onClick={() => router.push("/events/hackathon")}
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                Go to Event Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/events/hackathon")}
          className="mb-6 text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Event
        </Button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Hackathon Feedback
          </h1>
          <p className="text-base text-gray-600 sm:text-lg">
            Help us improve! Share your experience with us.
          </p>
        </div>

        {submitError && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Submission Failed</h3>
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Personal Information
              </CardTitle>
              <CardDescription>Tell us a bit about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900">
                    Full Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your full name"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900">
                    Email <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="your.email@example.com"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-900">
                    Mobile Number <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    })}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college" className="text-gray-900">
                    College/Institute <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="college"
                    {...register("college", {
                      required: "College is required",
                    })}
                    placeholder="Your college name"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.college && (
                    <p className="text-sm text-red-600">
                      {errors.college.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch" className="text-gray-900">
                    Branch <span className="text-red-600">*</span>
                  </Label>
                  <input
                    type="hidden"
                    {...register("branch", { required: "Branch is required" })}
                  />
                  <Select
                    onValueChange={(value) =>
                      setValue("branch", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science Engineering">
                        Computer Science Engineering
                      </SelectItem>
                      <SelectItem value="Information Technology">
                        Information Technology
                      </SelectItem>
                      <SelectItem value="Electronics and Communication Engineering">
                        Electronics and Communication Engineering
                      </SelectItem>
                      <SelectItem value="Electrical Engineering">
                        Electrical Engineering
                      </SelectItem>
                      <SelectItem value="Mechanical Engineering">
                        Mechanical Engineering
                      </SelectItem>
                      <SelectItem value="Civil Engineering">
                        Civil Engineering
                      </SelectItem>
                      <SelectItem value="Artificial Intelligence and Machine Learning">
                        Artificial Intelligence and Machine Learning
                      </SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.branch && (
                    <p className="text-sm text-red-600">
                      {errors.branch.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year" className="text-gray-900">
                    Year <span className="text-red-600">*</span>
                  </Label>
                  <input
                    type="hidden"
                    {...register("year", { required: "Year is required" })}
                  />
                  <Select
                    onValueChange={(value) =>
                      setValue("year", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.year && (
                    <p className="text-sm text-red-600">
                      {errors.year.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ratings */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Rate Your Experience
              </CardTitle>
              <CardDescription>
                How would you rate the following aspects?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <input
                type="hidden"
                {...register("overallRating", {
                  required: "Overall rating is required",
                  min: 1,
                  max: 5,
                })}
              />
              <StarRating
                value={overallRating || 0}
                onChange={(value) =>
                  setValue("overallRating", value, { shouldValidate: true })
                }
                label="Overall Hackathon Experience *"
              />
              {errors.overallRating && (
                <p className="text-sm text-red-600">
                  {errors.overallRating.message}
                </p>
              )}

              <input
                type="hidden"
                {...register("experienceRating", {
                  required: "Experience rating is required",
                  min: 1,
                  max: 5,
                })}
              />
              <StarRating
                value={experienceRating || 0}
                onChange={(value) =>
                  setValue("experienceRating", value, { shouldValidate: true })
                }
                label="Problem Statements & Challenges *"
              />
              {errors.experienceRating && (
                <p className="text-sm text-red-600">
                  {errors.experienceRating.message}
                </p>
              )}

              <input
                type="hidden"
                {...register("organizationRating", {
                  required: "Organization rating is required",
                  min: 1,
                  max: 5,
                })}
              />
              <StarRating
                value={organizationRating || 0}
                onChange={(value) =>
                  setValue("organizationRating", value, {
                    shouldValidate: true,
                  })
                }
                label="Event Organization & Management *"
              />
              {errors.organizationRating && (
                <p className="text-sm text-red-600">
                  {errors.organizationRating.message}
                </p>
              )}

              <div className="border-t border-gray-200 pt-4">
                <p className="mb-4 text-sm font-medium text-gray-700">
                  Optional Ratings
                </p>

                <div className="space-y-6">
                  <input type="hidden" {...register("venueRating")} />
                  <StarRating
                    value={venueRating || 0}
                    onChange={(value) => setValue("venueRating", value)}
                    label="Venue & Facilities"
                  />

                  <input type="hidden" {...register("mentorshipRating")} />
                  <StarRating
                    value={mentorshipRating || 0}
                    onChange={(value) => setValue("mentorshipRating", value)}
                    label="Mentorship & Support"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Feedback */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Share Your Thoughts
              </CardTitle>
              <CardDescription>
                Your detailed feedback helps us improve (Optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                {...register("suggestions")}
                placeholder="Share your feedback, suggestions, or any comments..."
                rows={6}
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black px-8 py-6 text-base text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto sm:px-12"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  <span>Submit Feedback</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
