"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Calendar,
  Building,
  GraduationCap,
  Mail,
  Phone,
  Image as ImageIcon,
  Loader2,
  Trophy,
  FileText,
  PlayCircle,
  StopCircle,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  gender: string;
  branch: string;
  year: string;
}

interface HackathonRegistration {
  id: string;
  userId: string;
  teamName: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  teamLeaderPhone: string;
  teamLeaderGender: string;
  institute: string;
  branch: string;
  year: string;
  teamMembers: TeamMember[];
  paymentScreenshot: string | null;
  transactionId: string | null;
  status: "pending" | "verified" | "rejected";
  round1PptUrl: string | null;
  round1SubmittedAt: string | null;
  round1Status: string | null;
  createdAt: string;
  updatedAt: string;
}

interface RegistrationsResponse {
  registrations: HackathonRegistration[];
  total: number;
}

interface ControlResponse {
  currentTime: string;
  automaticPeriod: { start: string; end: string; isActive: boolean };
  override: {
    isActive: boolean;
    manuallyControlled: boolean;
    overrideStart: string | null;
    overrideEnd: string | null;
  };
  effectiveStatus: boolean;
}

const fetchRegistrations = async (): Promise<RegistrationsResponse> => {
  const res = await fetch("/api/admin/hackathon/registrations");
  const data: unknown = await res.json();
  if (!res.ok) {
    const error =
      data && typeof data === "object" && "error" in data
        ? (data as { error: string }).error
        : "Failed to fetch registrations";
    throw new Error(error);
  }
  return data as RegistrationsResponse;
};

const fetchSubmissionControl = async (): Promise<ControlResponse> => {
  const res = await fetch("/api/admin/hackathon/submission-control");
  const data: unknown = await res.json();
  if (!res.ok) {
    const error =
      data && typeof data === "object" && "error" in data
        ? (data as { error: string }).error
        : "Failed to fetch submission control";
    throw new Error(error);
  }
  return data as ControlResponse;
};

const controlSubmissionPeriod = async (
  action: "start" | "end" | "reset",
): Promise<{ message: string; override?: any }> => {
  const res = await fetch("/api/admin/hackathon/submission-control", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  const data: unknown = await res.json();
  if (!res.ok) {
    const error =
      data && typeof data === "object" && "error" in data
        ? (data as { error: string }).error
        : "Failed to control submission period";
    throw new Error(error);
  }
  return data as { message: string; override?: any };
};

const updateRegistrationStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<{ success: boolean; registration: HackathonRegistration }> => {
  const res = await fetch(`/api/admin/hackathon/registrations/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update status");
  }

  return res.json() as Promise<{
    success: boolean;
    registration: HackathonRegistration;
  }>;
};

function StatusBadge({ status }: { status: string }) {
  const configs = {
    verified: {
      icon: <CheckCircle className="h-3 w-3" />,
      label: "Verified",
      className: "bg-green-100 text-green-700 border-green-300",
    },
    rejected: {
      icon: <XCircle className="h-3 w-3" />,
      label: "Rejected",
      className: "bg-red-100 text-red-700 border-red-300",
    },
    pending: {
      icon: <Clock className="h-3 w-3" />,
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
  };

  const config = configs[status as keyof typeof configs] || configs.pending;

  return (
    <Badge className={`${config.className} flex items-center gap-1 border`}>
      {config.icon}
      {config.label}
    </Badge>
  );
}

function RegistrationDetailsDialog({
  registration,
}: {
  registration: HackathonRegistration;
}) {
  const [showScreenshot, setShowScreenshot] = useState(false);
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: updateRegistrationStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["hackathonRegistrations"] });
      toast.success(`Registration ${data.registration.status} successfully!`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const handleStatusChange = (status: string) => {
    updateStatusMutation.mutate({ id: registration.id, status });
  };

  const totalMembers = registration.teamMembers.length + 1;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-black" />
            {registration.teamName}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Registered on {new Date(registration.createdAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Actions */}
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">
                    Current Status
                  </p>
                  <StatusBadge status={registration.status} />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                    onClick={() => handleStatusChange("verified")}
                    disabled={
                      updateStatusMutation.isPending ||
                      registration.status === "verified"
                    }
                  >
                    {updateStatusMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Verify
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                    onClick={() => handleStatusChange("rejected")}
                    disabled={
                      updateStatusMutation.isPending ||
                      registration.status === "rejected"
                    }
                  >
                    {updateStatusMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4" />
                    )}
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange("pending")}
                    disabled={
                      updateStatusMutation.isPending ||
                      registration.status === "pending"
                    }
                  >
                    {updateStatusMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Clock className="mr-2 h-4 w-4" />
                    )}
                    Set Pending
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Leader Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Team Leader Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-base text-gray-900">
                    {registration.teamLeaderName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="text-base capitalize text-gray-900">
                    {registration.teamLeaderGender}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
                    <Mail className="h-3 w-3" />
                    Email
                  </p>
                  <p className="text-base text-gray-900">
                    {registration.teamLeaderEmail}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
                    <Phone className="h-3 w-3" />
                    Phone
                  </p>
                  <p className="text-base text-gray-900">
                    {registration.teamLeaderPhone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
                    <Building className="h-3 w-3" />
                    Institute
                  </p>
                  <p className="text-base text-gray-900">
                    {registration.institute}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
                    <GraduationCap className="h-3 w-3" />
                    Branch & Year
                  </p>
                  <p className="text-base text-gray-900">
                    {registration.branch} - {registration.year}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          {registration.teamMembers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Team Members ({registration.teamMembers.length})
                  <Badge className="ml-2 bg-black text-white">
                    Total: {totalMembers}/4
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registration.teamMembers.map((member, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="font-semibold text-gray-900">
                              Member {index + 1}: {member.name}
                            </p>
                            <Badge variant="outline" className="capitalize">
                              {member.gender}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-500">Email</p>
                              <p className="text-gray-900">{member.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Phone</p>
                              <p className="text-gray-900">{member.phone}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Branch</p>
                              <p className="text-gray-900">{member.branch}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Year</p>
                              <p className="text-gray-900">{member.year}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ImageIcon className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {registration.transactionId && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Transaction ID
                  </p>
                  <p className="rounded bg-gray-50 px-3 py-2 font-mono text-base text-gray-900">
                    {registration.transactionId}
                  </p>
                </div>
              )}

              {registration.paymentScreenshot && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Payment Screenshot
                  </p>
                  {!showScreenshot ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowScreenshot(true)}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      View Screenshot
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="relative max-h-96 w-full overflow-hidden rounded-lg border bg-gray-50">
                        <Image
                          src={registration.paymentScreenshot}
                          alt="Payment Screenshot"
                          width={800}
                          height={600}
                          className="h-auto w-full object-contain"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowScreenshot(false)}
                        >
                          Hide Screenshot
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (registration.paymentScreenshot) {
                              window.open(
                                registration.paymentScreenshot,
                                "_blank",
                              );
                            }
                          }}
                        >
                          Open in New Tab
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!registration.paymentScreenshot &&
                !registration.transactionId && (
                  <p className="text-sm italic text-gray-500">
                    No payment information provided
                  </p>
                )}
            </CardContent>
          </Card>

          {/* Round 1 Submission */}
          <Card
            className={
              registration.round1PptUrl ? "border-green-300 bg-green-50" : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Round 1 PPT Submission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {registration.round1SubmittedAt ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="border-green-300 bg-green-100 text-green-700">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Submitted
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {new Date(registration.round1SubmittedAt).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>

                  {registration.round1PptUrl ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        if (registration.round1PptUrl) {
                          window.open(registration.round1PptUrl, "_blank");
                        }
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Submitted PPT
                    </Button>
                  ) : (
                    <span className="text-gray-500">No PPT URL</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Not submitted yet</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminHackathonRegistrationsPage() {
  const [filter, setFilter] = useState<
    "all" | "pending" | "verified" | "rejected"
  >("all");

  const { data, isLoading, isError } = useQuery<RegistrationsResponse>({
    queryKey: ["hackathonRegistrations"],
    queryFn: fetchRegistrations,
    refetchInterval: 10000, // Auto-refresh every 10 seconds
  });

  const { data: controlData, refetch: refetchControl } = useQuery({
    queryKey: ["submissionControl"],
    queryFn: fetchSubmissionControl,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const controlMutation = useMutation({
    mutationFn: controlSubmissionPeriod,
    onSuccess: (data) => {
      toast.success(data.message);
      refetchControl();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update submission period");
    },
  });

  const filteredRegistrations =
    data?.registrations.filter((reg) =>
      filter === "all" ? true : reg.status === filter,
    ) || [];

  const stats = {
    total: data?.total || 0,
    pending:
      data?.registrations.filter((r) => r.status === "pending").length || 0,
    verified:
      data?.registrations.filter((r) => r.status === "verified").length || 0,
    rejected:
      data?.registrations.filter((r) => r.status === "rejected").length || 0,
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <XCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg font-semibold text-gray-900">
          Failed to load registrations
        </p>
        <p className="text-sm text-gray-500">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hackathon Registrations
        </h1>
        <p className="mt-1 text-gray-600">
          Manage and review all hackathon team registrations
        </p>
      </div>

      {/* Submission Period Control Panel */}
      <Card className="border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-700" />
            Round 1 Submission Control
          </CardTitle>
          <CardDescription>
            Manually start or end the submission period
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {controlData && (
            <div className="space-y-4">
              {/* Status Display */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-sm font-medium text-gray-500">
                    Current Status
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {controlData.effectiveStatus ? (
                      <Badge className="border-green-300 bg-green-100 text-green-700">
                        <PlayCircle className="mr-1 h-3 w-3" />
                        Active - Accepting Submissions
                      </Badge>
                    ) : (
                      <Badge className="border-red-300 bg-red-100 text-red-700">
                        <StopCircle className="mr-1 h-3 w-3" />
                        Closed - Not Accepting
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border bg-white p-4">
                  <p className="text-sm font-medium text-gray-500">
                    Control Mode
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline">
                      {controlData.override.manuallyControlled
                        ? "Manual Override"
                        : "Automatic"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Automatic Period Info */}
              <div className="rounded-lg border bg-white p-4">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Automatic Schedule:
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    Start:{" "}
                    {new Date(controlData.automaticPeriod.start).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                  <p>
                    End:{" "}
                    {new Date(controlData.automaticPeriod.end).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                  <p className="mt-1 text-xs italic">
                    {controlData.automaticPeriod.isActive
                      ? "Currently within automatic period"
                      : "Currently outside automatic period"}
                  </p>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => controlMutation.mutate("start")}
                  disabled={
                    controlMutation.isPending || controlData.effectiveStatus
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {controlMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PlayCircle className="mr-2 h-4 w-4" />
                  )}
                  Start Submissions
                </Button>

                <Button
                  onClick={() => controlMutation.mutate("end")}
                  disabled={
                    controlMutation.isPending || !controlData.effectiveStatus
                  }
                  variant="destructive"
                  className="flex-1"
                >
                  {controlMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <StopCircle className="mr-2 h-4 w-4" />
                  )}
                  End Submissions
                </Button>

                <Button
                  onClick={() => controlMutation.mutate("reset")}
                  disabled={
                    controlMutation.isPending ||
                    !controlData.override.manuallyControlled
                  }
                  variant="outline"
                  className="flex-1"
                >
                  {controlMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RotateCcw className="mr-2 h-4 w-4" />
                  )}
                  Reset to Auto
                </Button>
              </div>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <p className="text-xs text-yellow-800">
                  <strong>Note:</strong> Manual control overrides the automatic
                  schedule. Use "Reset to Auto" to return to the automatic Oct
                  25-29 schedule.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => setFilter("all")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Teams</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Trophy className="h-10 w-10 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => setFilter("pending")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <Clock className="h-10 w-10 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => setFilter("verified")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Verified</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.verified}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => setFilter("rejected")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <XCircle className="h-10 w-10 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Round 1 Submissions Overview */}
      <Card className="border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-yellow-700" />
            Round 1 Submissions
          </CardTitle>
          <CardDescription>
            PPT submissions for Round 1 (Oct 25 - Oct 29, 2025)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-white p-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Submissions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {data?.registrations.filter((r) => r.round1PptUrl).length ||
                    0}
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {data?.registrations.filter(
                    (r) => r.status === "verified" && !r.round1PptUrl,
                  ).length || 0}
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <p className="text-sm font-medium text-gray-500">
                  Submission Rate
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.verified > 0
                    ? Math.round(
                        ((data?.registrations.filter((r) => r.round1PptUrl)
                          .length ?? 0) /
                          stats.verified) *
                          100,
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>

            {(data?.registrations.filter((r) => r.round1PptUrl).length ?? 0) >
              0 && (
              <div className="rounded-lg border bg-white">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Leader</TableHead>
                      <TableHead>Submitted At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.registrations
                      .filter((r) => r.round1PptUrl)
                      .sort(
                        (a, b) =>
                          new Date(b.round1SubmittedAt ?? 0).getTime() -
                          new Date(a.round1SubmittedAt ?? 0).getTime(),
                      )
                      .map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell className="font-medium">
                            {registration.teamName}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                {registration.teamLeaderName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {registration.teamLeaderEmail}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {registration.round1SubmittedAt
                              ? new Date(
                                  registration.round1SubmittedAt,
                                ).toLocaleString("en-IN", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })
                              : "—"}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  if (registration.round1PptUrl)
                                    window.open(
                                      registration.round1PptUrl,
                                      "_blank",
                                    );
                                }}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View PPT
                              </Button>
                              <RegistrationDetailsDialog
                                registration={registration}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Registrations</CardTitle>
          <CardDescription>
            {filter === "all"
              ? "Showing all registrations"
              : `Showing ${filter} registrations`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-black hover:bg-gray-900" : ""}
            >
              All ({stats.total})
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
              className={
                filter === "pending" ? "bg-yellow-600 hover:bg-yellow-700" : ""
              }
            >
              <Clock className="mr-2 h-4 w-4" />
              Pending ({stats.pending})
            </Button>
            <Button
              variant={filter === "verified" ? "default" : "outline"}
              onClick={() => setFilter("verified")}
              className={
                filter === "verified" ? "bg-green-600 hover:bg-green-700" : ""
              }
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Verified ({stats.verified})
            </Button>
            <Button
              variant={filter === "rejected" ? "default" : "outline"}
              onClick={() => setFilter("rejected")}
              className={
                filter === "rejected" ? "bg-red-600 hover:bg-red-700" : ""
              }
            >
              <XCircle className="mr-2 h-4 w-4" />
              Rejected ({stats.rejected})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registrations List</CardTitle>
          <CardDescription>
            {filteredRegistrations.length} registration(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRegistrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-3 py-12">
              <Trophy className="h-16 w-16 text-gray-300" />
              <p className="text-lg font-semibold text-gray-500">
                No registrations found
              </p>
              <p className="text-sm text-gray-400">
                {filter === "all"
                  ? "No teams have registered yet"
                  : `No ${filter} registrations`}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Leader</TableHead>
                    <TableHead>Institute</TableHead>
                    <TableHead>Team Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">
                        {registration.teamName}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {registration.teamLeaderName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {registration.teamLeaderEmail}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{registration.institute}</p>
                          <p className="text-xs text-gray-500">
                            {registration.branch}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {registration.teamMembers.length + 1}/4
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={registration.status} />
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(registration.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </TableCell>
                      <TableCell>
                        <RegistrationDetailsDialog
                          registration={registration}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
