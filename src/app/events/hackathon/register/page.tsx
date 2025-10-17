"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Trash2,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
  Users,
  Share2,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  gender: string;
  branch: string;
  year: string;
}

interface HackathonFormData {
  // General Information
  teamName: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  teamLeaderPhone: string;
  teamLeaderGender: string;
  institute: string;
  branch: string;
  year: string;

  // Team Members
  teamMembers: TeamMember[];

  // Payment
  paymentScreenshotUrl?: string;
  transactionId?: string;

  // Declaration
  declarationAccepted: boolean;
}

export default function HackathonRegistrationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [paymentScreenshotUrl, setPaymentScreenshotUrl] = useState<
    string | null
  >(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  // Check authentication and registration status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();

        if (!session.data?.session) {
          // Not logged in, redirect to auth page with return URL
          router.push(`/auth?redirect=/events/hackathon/register`);
          return;
        }

        // Check if user is already registered
        try {
          const regRes = await fetch("/api/hackathon/my-registration");
          if (regRes.ok) {
            const regData = await regRes.json();
            if (regData.registration) {
              // User is already registered, redirect to dashboard
              setAlreadyRegistered(true);
              setTimeout(() => {
                router.push("/dashboard");
              }, 2000);
              return;
            }
          }
        } catch (error) {
          console.error("Registration check error:", error);
        }

        setIsCheckingAuth(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push(`/auth?redirect=/events/hackathon/register`);
      }
    };

    checkAuth();
  }, [router]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HackathonFormData>({
    defaultValues: {
      teamMembers: [
        { name: "", email: "", phone: "", gender: "", branch: "", year: "" },
      ],
      declarationAccepted: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const declarationAccepted = watch("declarationAccepted");

  const onSubmit = async (data: HackathonFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!paymentScreenshotUrl) {
        throw new Error("Please upload payment screenshot");
      }

      const payload = {
        ...data,
        paymentScreenshotUrl,
        teamMembers: JSON.stringify(data.teamMembers),
        declarationAccepted: data.declarationAccepted.toString(),
      };

      const response = await fetch("/api/hackathon/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setSubmitSuccess(true);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total team size (leader + members)
  const totalTeamSize = fields.length + 1;
  const canAddMember = totalTeamSize < 4;
  const canRemoveMember = fields.length > 1;

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-6">
        <Card className="w-full max-w-md border-gray-200">
          <CardContent className="pt-6">
            <div className="space-y-4 text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-black" />
              <h2 className="text-xl font-semibold text-gray-900">
                Checking authentication...
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your session.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show already registered message
  if (alreadyRegistered) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 sm:p-6">
        <Card className="w-full max-w-lg border-green-500 shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6 text-center">
              {/* Success Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>

              {/* Already Registered Message */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Already Registered!
                </h2>
                <p className="text-sm text-gray-600 sm:text-base">
                  You have already registered for this hackathon.
                </p>
              </div>

              {/* WhatsApp Community Section */}
              <div className="space-y-4 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    Join Our Community
                  </h3>
                </div>

                <p className="text-sm text-gray-700">
                  Connect with fellow participants, get important updates, and
                  collaborate with your team!
                </p>

                <div className="space-y-3">
                  {/* Join Button */}
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-6 text-base font-semibold text-white shadow-lg transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-xl sm:text-lg"
                  >
                    <a
                      href="https://chat.whatsapp.com/LGiIwAILD1eFxr1JEByQaJ?mode=wwc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span>Join WhatsApp Community</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                  {/* Share Button */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const shareText =
                        "🚀 Join our Hackathon WhatsApp Community!\n\nhttps://chat.whatsapp.com/LGiIwAILD1eFxr1JEByQaJ?mode=wwc";
                      if (navigator.share) {
                        navigator
                          .share({
                            title: "Hackathon WhatsApp Community",
                            text: shareText,
                          })
                          .catch(() => {
                            navigator.clipboard.writeText(shareText);
                            toast.success("Link copied to clipboard!");
                          });
                      } else {
                        navigator.clipboard.writeText(shareText);
                        toast.success("Link copied to clipboard!");
                      }
                    }}
                    className="w-full border-green-600 py-5 text-green-700 hover:bg-green-50"
                  >
                    <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">
                      Share with Team Members
                    </span>
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  💡 Make sure to share this link with all your team members!
                </p>
              </div>

              {/* Redirecting Message */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                <span>Redirecting to dashboard...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  🎉 Registration Successful!
                </h2>
                <p className="text-sm text-gray-600 sm:text-base">
                  Your team has been registered successfully for the hackathon.
                </p>
              </div>

              {/* WhatsApp Community Section */}
              <div className="space-y-4 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    Join Our Community
                  </h3>
                </div>

                <p className="text-sm text-gray-700">
                  Connect with fellow participants, get important updates, and
                  collaborate with your team!
                </p>

                <div className="space-y-3">
                  {/* Join Button */}
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-6 text-base font-semibold text-white shadow-lg transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-xl sm:text-lg"
                  >
                    <a
                      href="https://chat.whatsapp.com/LGiIwAILD1eFxr1JEByQaJ?mode=wwc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span>Join WhatsApp Community</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                  {/* Share Button */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const shareText =
                        "🚀 Join our Hackathon WhatsApp Community!\n\nhttps://chat.whatsapp.com/LGiIwAILD1eFxr1JEByQaJ?mode=wwc";
                      if (navigator.share) {
                        navigator
                          .share({
                            title: "Hackathon WhatsApp Community",
                            text: shareText,
                          })
                          .catch(() => {
                            navigator.clipboard.writeText(shareText);
                            toast.success("Link copied to clipboard!");
                          });
                      } else {
                        navigator.clipboard.writeText(shareText);
                        toast.success("Link copied to clipboard!");
                      }
                    }}
                    className="w-full border-green-600 py-5 text-green-700 hover:bg-green-50"
                  >
                    <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">
                      Share with Team Members
                    </span>
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  💡 Make sure to share this link with all your team members!
                </p>
              </div>

              {/* Redirecting Message */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Redirecting to dashboard...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-4xl">
            Hackathon Registration
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Fill in the details to register your team
          </p>
          <Badge className="mt-3 bg-black text-sm text-white sm:mt-4">
            Team Size: {totalTeamSize}/4
          </Badge>
        </div>

        {submitError && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">
                Registration Failed
              </h3>
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: General Information */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                General Information
              </CardTitle>
              <CardDescription>
                Team leader and institute details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Team Name */}
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-gray-900">
                  Team Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="teamName"
                  {...register("teamName", {
                    required: "Team name is required",
                  })}
                  placeholder="Enter your team name"
                  className="border-gray-300 focus:border-black focus:ring-black"
                />
                {errors.teamName && (
                  <p className="text-sm text-red-600">
                    {errors.teamName.message}
                  </p>
                )}
              </div>

              {/* Team Leader Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="teamLeaderName" className="text-gray-900">
                    Leader Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="teamLeaderName"
                    {...register("teamLeaderName", {
                      required: "Leader name is required",
                    })}
                    placeholder="Full name"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.teamLeaderName && (
                    <p className="text-sm text-red-600">
                      {errors.teamLeaderName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamLeaderEmail" className="text-gray-900">
                    Leader Email <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="teamLeaderEmail"
                    type="email"
                    {...register("teamLeaderEmail", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="email@example.com"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.teamLeaderEmail && (
                    <p className="text-sm text-red-600">
                      {errors.teamLeaderEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamLeaderPhone" className="text-gray-900">
                    Phone <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="teamLeaderPhone"
                    {...register("teamLeaderPhone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    })}
                    placeholder="10-digit phone number"
                    maxLength={10}
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.teamLeaderPhone && (
                    <p className="text-sm text-red-600">
                      {errors.teamLeaderPhone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamLeaderGender" className="text-gray-900">
                    Gender <span className="text-red-600">*</span>
                  </Label>
                  <input
                    type="hidden"
                    {...register("teamLeaderGender", {
                      required: "Gender is required",
                    })}
                  />
                  <Select
                    onValueChange={(value) =>
                      setValue("teamLeaderGender", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.teamLeaderGender && (
                    <p className="text-sm text-red-600">
                      {errors.teamLeaderGender.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Institute Details */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="institute" className="text-gray-900">
                    Institute <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="institute"
                    {...register("institute", {
                      required: "Institute is required",
                    })}
                    placeholder="Your institute name"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  {errors.institute && (
                    <p className="text-sm text-red-600">
                      {errors.institute.message}
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
                      <SelectValue placeholder="Select branch" />
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
                      <SelectItem value="Chemical Engineering">
                        Chemical Engineering
                      </SelectItem>
                      <SelectItem value="Aerospace Engineering">
                        Aerospace Engineering
                      </SelectItem>
                      <SelectItem value="Biotechnology">
                        Biotechnology
                      </SelectItem>
                      <SelectItem value="Artificial Intelligence and Machine Learning">
                        Artificial Intelligence and Machine Learning
                      </SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Cybersecurity">
                        Cybersecurity
                      </SelectItem>
                      <SelectItem value="Robotics and Automation">
                        Robotics and Automation
                      </SelectItem>
                      <SelectItem value="Electronics and Instrumentation">
                        Electronics and Instrumentation
                      </SelectItem>
                      <SelectItem value="Production Engineering">
                        Production Engineering
                      </SelectItem>
                      <SelectItem value="Industrial Engineering">
                        Industrial Engineering
                      </SelectItem>
                      <SelectItem value="Automobile Engineering">
                        Automobile Engineering
                      </SelectItem>
                      <SelectItem value="Mining Engineering">
                        Mining Engineering
                      </SelectItem>
                      <SelectItem value="Petroleum Engineering">
                        Petroleum Engineering
                      </SelectItem>
                      <SelectItem value="Agricultural Engineering">
                        Agricultural Engineering
                      </SelectItem>
                      <SelectItem value="Environmental Engineering">
                        Environmental Engineering
                      </SelectItem>
                      <SelectItem value="Textile Engineering">
                        Textile Engineering
                      </SelectItem>
                      <SelectItem value="Metallurgical Engineering">
                        Metallurgical Engineering
                      </SelectItem>
                      <SelectItem value="Marine Engineering">
                        Marine Engineering
                      </SelectItem>
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
                      <SelectValue placeholder="Select year" />
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

          {/* Section 2: Team Members */}
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-gray-900">Team Members</CardTitle>
                  <CardDescription>
                    Add 1-3 additional members (Total: 2-4 including leader)
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      name: "",
                      email: "",
                      phone: "",
                      gender: "",
                      branch: "",
                      year: "",
                    })
                  }
                  disabled={!canAddMember}
                  size="sm"
                  className="w-full bg-black text-white hover:bg-gray-900 disabled:bg-gray-300 sm:w-auto"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">
                      Member {index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={!canRemoveMember}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700 disabled:text-gray-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-gray-900">
                        Name <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        {...register(`teamMembers.${index}.name`, {
                          required: "Member name is required",
                        })}
                        placeholder="Full name"
                        className="border-gray-300 focus:border-black focus:ring-black"
                      />
                      {errors.teamMembers?.[index]?.name && (
                        <p className="text-sm text-red-600">
                          {errors.teamMembers[index]?.name?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-900">
                        Email <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="email"
                        {...register(`teamMembers.${index}.email`, {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="email@example.com"
                        className="border-gray-300 focus:border-black focus:ring-black"
                      />
                      {errors.teamMembers?.[index]?.email && (
                        <p className="text-sm text-red-600">
                          {errors.teamMembers[index]?.email?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-900">
                        Phone <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        {...register(`teamMembers.${index}.phone`, {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Phone number must be 10 digits",
                          },
                        })}
                        placeholder="10-digit phone number"
                        maxLength={10}
                        className="border-gray-300 focus:border-black focus:ring-black"
                      />
                      {errors.teamMembers?.[index]?.phone && (
                        <p className="text-sm text-red-600">
                          {errors.teamMembers[index]?.phone?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-900">
                        Gender <span className="text-red-600">*</span>
                      </Label>
                      <input
                        type="hidden"
                        {...register(`teamMembers.${index}.gender`, {
                          required: "Gender is required",
                        })}
                      />
                      <Select
                        onValueChange={(value) =>
                          setValue(`teamMembers.${index}.gender`, value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.teamMembers?.[index]?.gender && (
                        <p className="text-sm text-red-600">
                          {errors.teamMembers[index]?.gender?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-900">
                        Branch <span className="text-red-600">*</span>
                      </Label>
                      <input
                        type="hidden"
                        {...register(`teamMembers.${index}.branch`, {
                          required: "Branch is required",
                        })}
                      />
                      <Select
                        onValueChange={(value) =>
                          setValue(`teamMembers.${index}.branch`, value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
                          <SelectValue placeholder="Select branch" />
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
                          <SelectItem value="Chemical Engineering">
                            Chemical Engineering
                          </SelectItem>
                          <SelectItem value="Aerospace Engineering">
                            Aerospace Engineering
                          </SelectItem>
                          <SelectItem value="Biotechnology">
                            Biotechnology
                          </SelectItem>
                          <SelectItem value="Artificial Intelligence and Machine Learning">
                            Artificial Intelligence and Machine Learning
                          </SelectItem>
                          <SelectItem value="Data Science">
                            Data Science
                          </SelectItem>
                          <SelectItem value="Cybersecurity">
                            Cybersecurity
                          </SelectItem>
                          <SelectItem value="Robotics and Automation">
                            Robotics and Automation
                          </SelectItem>
                          <SelectItem value="Electronics and Instrumentation">
                            Electronics and Instrumentation
                          </SelectItem>
                          <SelectItem value="Production Engineering">
                            Production Engineering
                          </SelectItem>
                          <SelectItem value="Industrial Engineering">
                            Industrial Engineering
                          </SelectItem>
                          <SelectItem value="Automobile Engineering">
                            Automobile Engineering
                          </SelectItem>
                          <SelectItem value="Mining Engineering">
                            Mining Engineering
                          </SelectItem>
                          <SelectItem value="Petroleum Engineering">
                            Petroleum Engineering
                          </SelectItem>
                          <SelectItem value="Agricultural Engineering">
                            Agricultural Engineering
                          </SelectItem>
                          <SelectItem value="Environmental Engineering">
                            Environmental Engineering
                          </SelectItem>
                          <SelectItem value="Textile Engineering">
                            Textile Engineering
                          </SelectItem>
                          <SelectItem value="Metallurgical Engineering">
                            Metallurgical Engineering
                          </SelectItem>
                          <SelectItem value="Marine Engineering">
                            Marine Engineering
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.teamMembers?.[index]?.branch && (
                        <p className="text-sm text-red-600">
                          {errors.teamMembers[index]?.branch?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-900">
                        Year <span className="text-red-600">*</span>
                      </Label>
                      <input
                        type="hidden"
                        {...register(`teamMembers.${index}.year`, {
                          required: "Year is required",
                        })}
                      />
                      <Select
                        onValueChange={(value) =>
                          setValue(`teamMembers.${index}.year`, value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st">1st Year</SelectItem>
                          <SelectItem value="2nd">2nd Year</SelectItem>
                          <SelectItem value="3rd">3rd Year</SelectItem>
                          <SelectItem value="4th">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.teamMembers?.[index]?.year && (
                        <p className="text-sm text-red-600">
                          {errors.teamMembers[index]?.year?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {fields.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  <p>No additional members added yet.</p>
                  <p className="text-sm">
                    Click "Add Member" to include team members.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 3: Payment */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Payment Details</CardTitle>
              <CardDescription>
                Upload payment screenshot and transaction details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* UPI QR Code */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full max-w-xs overflow-hidden rounded-lg border-2 border-black bg-[#F3F6FD] p-4 sm:p-6">
                    <div className="relative aspect-square w-full">
                      <Image
                        src="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpfqquhUXrTM2A4iGtHSU9JzXjlhanE7L0yQkV"
                        alt="QR-Code"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-full space-y-2 text-center">
                    <p className="text-base font-semibold text-gray-900 sm:text-lg">
                      Registration Fee: ₹300
                    </p>
                    <div className="break-all text-sm sm:text-base">
                      <span className="text-gray-700">UPI ID: </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("chirayupatle2@okaxis");
                          toast.success("UPI ID copied to clipboard!");
                        }}
                        className="cursor-pointer font-medium text-blue-600 underline hover:text-blue-700"
                      >
                        chirayupatle2@okaxis
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Screenshot Upload */}
              <div className="space-y-2">
                <Label className="text-gray-900">
                  Payment Screenshot <span className="text-red-600">*</span>
                </Label>
                <div className="flex flex-col gap-4">
                  {!paymentScreenshotUrl ? (
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-gray-400 sm:p-6">
                      <UploadButton
                        endpoint="paymentScreenshot"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]) {
                            setPaymentScreenshotUrl(res[0].url);
                            setValue("paymentScreenshotUrl", res[0].url);
                          }
                        }}
                        onUploadError={(error: Error) => {
                          setSubmitError(`Upload failed: ${error.message}`);
                        }}
                        appearance={{
                          button:
                            "bg-black hover:bg-gray-900 text-white px-4 py-2 text-sm sm:text-base rounded-md ut-ready:bg-black ut-uploading:cursor-not-allowed ut-uploading:bg-gray-400",
                          allowedContent: "text-gray-600 text-xs sm:text-sm",
                        }}
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Accepted formats: JPG, PNG (Max 4MB)
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-3 sm:p-4">
                      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="flex items-center gap-2 text-xs font-medium text-green-900 sm:text-sm">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                          Screenshot uploaded successfully!
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setPaymentScreenshotUrl(null);
                            setValue("paymentScreenshotUrl", "");
                          }}
                          className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto"
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="relative mt-2 w-full max-w-xs">
                        <Image
                          src={paymentScreenshotUrl}
                          alt="Payment screenshot preview"
                          width={300}
                          height={200}
                          className="rounded border border-green-300"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction ID */}
              <div className="space-y-2">
                <Label
                  htmlFor="transactionId"
                  className="text-sm text-gray-900 sm:text-base"
                >
                  Transaction ID (Optional)
                </Label>
                <Input
                  id="transactionId"
                  {...register("transactionId")}
                  placeholder="Enter UPI transaction ID"
                  className="border-gray-300 text-sm focus:border-black focus:ring-black sm:text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Declaration */}
          <Card className="border-gray-200">
            <CardContent className="p-4 pt-6 sm:p-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="declarationAccepted"
                  checked={declarationAccepted}
                  onCheckedChange={(checked) => {
                    setValue("declarationAccepted", checked === true, {
                      shouldValidate: true,
                    });
                  }}
                  className="mt-1 flex-shrink-0 border-gray-300"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="declarationAccepted"
                    className="cursor-pointer text-sm font-normal leading-relaxed text-gray-900 sm:text-base"
                  >
                    I declare that all information provided is accurate and I
                    agree to abide by the event rules.{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  {errors.declarationAccepted && (
                    <p className="text-xs text-red-600 sm:text-sm">
                      {errors.declarationAccepted.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center px-4 pt-4 sm:px-0">
            <Button
              type="submit"
              disabled={!declarationAccepted || isSubmitting}
              className="w-full bg-black px-8 py-5 text-base text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto sm:px-12 sm:py-6 sm:text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Submitting...</span>
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">
                    Submit Registration
                  </span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
