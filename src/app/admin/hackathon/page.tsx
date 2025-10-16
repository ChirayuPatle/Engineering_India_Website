"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Trophy
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
  createdAt: string;
  updatedAt: string;
}

interface RegistrationsResponse {
  registrations: HackathonRegistration[];
  total: number;
}

const fetchRegistrations = async (): Promise<RegistrationsResponse> => {
  const res = await fetch("/api/admin/hackathon/registrations");
  if (!res.ok) {
    throw new Error("Failed to fetch registrations");
  }
  return res.json() as Promise<RegistrationsResponse>;
};

const updateRegistrationStatus = async ({ id, status }: { id: string; status: string }): Promise<{ success: boolean; registration: HackathonRegistration }> => {
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

  return res.json() as Promise<{ success: boolean; registration: HackathonRegistration }>;
};

function StatusBadge({ status }: { status: string }) {
  const configs = {
    verified: {
      icon: <CheckCircle className="w-3 h-3" />,
      label: "Verified",
      className: "bg-green-100 text-green-700 border-green-300",
    },
    rejected: {
      icon: <XCircle className="w-3 h-3" />,
      label: "Rejected",
      className: "bg-red-100 text-red-700 border-red-300",
    },
    pending: {
      icon: <Clock className="w-3 h-3" />,
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
  };

  const config = configs[status as keyof typeof configs] || configs.pending;

  return (
    <Badge className={`${config.className} border flex items-center gap-1`}>
      {config.icon}
      {config.label}
    </Badge>
  );
}

function RegistrationDetailsDialog({ registration }: { registration: HackathonRegistration }) {
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
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-black" />
            {registration.teamName}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Registered on {new Date(registration.createdAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Actions */}
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Current Status</p>
                  <StatusBadge status={registration.status} />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
                    onClick={() => handleStatusChange("verified")}
                    disabled={updateStatusMutation.isPending || registration.status === "verified"}
                  >
                    {updateStatusMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Verify
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-red-50 hover:bg-red-100 text-red-700 border-red-300"
                    onClick={() => handleStatusChange("rejected")}
                    disabled={updateStatusMutation.isPending || registration.status === "rejected"}
                  >
                    {updateStatusMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange("pending")}
                    disabled={updateStatusMutation.isPending || registration.status === "pending"}
                  >
                    {updateStatusMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Clock className="w-4 h-4 mr-2" />
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
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Leader Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-base text-gray-900">{registration.teamLeaderName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="text-base text-gray-900 capitalize">{registration.teamLeaderGender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </p>
                  <p className="text-base text-gray-900">{registration.teamLeaderEmail}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Phone
                  </p>
                  <p className="text-base text-gray-900">{registration.teamLeaderPhone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    Institute
                  </p>
                  <p className="text-base text-gray-900">{registration.institute}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    Branch & Year
                  </p>
                  <p className="text-base text-gray-900">{registration.branch} - {registration.year}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          {registration.teamMembers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
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
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-gray-900">Member {index + 1}: {member.name}</p>
                            <Badge variant="outline" className="capitalize">{member.gender}</Badge>
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
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {registration.transactionId && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Transaction ID</p>
                  <p className="text-base text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">
                    {registration.transactionId}
                  </p>
                </div>
              )}
              
              {registration.paymentScreenshot && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Payment Screenshot</p>
                  {!showScreenshot ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowScreenshot(true)}
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      View Screenshot
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="relative w-full max-h-96 border rounded-lg overflow-hidden bg-gray-50">
                        <Image
                          src={registration.paymentScreenshot}
                          alt="Payment Screenshot"
                          width={800}
                          height={600}
                          className="w-full h-auto object-contain"
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
                          onClick={() => window.open(registration.paymentScreenshot!, '_blank')}
                        >
                          Open in New Tab
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!registration.paymentScreenshot && !registration.transactionId && (
                <p className="text-sm text-gray-500 italic">No payment information provided</p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminHackathonRegistrationsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "rejected">("all");

  const { data, isLoading, isError } = useQuery<RegistrationsResponse>({
    queryKey: ["hackathonRegistrations"],
    queryFn: fetchRegistrations,
    refetchInterval: 10000, // Auto-refresh every 10 seconds
  });

  const filteredRegistrations = data?.registrations.filter(reg => 
    filter === "all" ? true : reg.status === filter
  ) || [];

  const stats = {
    total: data?.total || 0,
    pending: data?.registrations.filter(r => r.status === "pending").length || 0,
    verified: data?.registrations.filter(r => r.status === "verified").length || 0,
    rejected: data?.registrations.filter(r => r.status === "rejected").length || 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <XCircle className="w-12 h-12 text-red-500" />
        <p className="text-lg font-semibold text-gray-900">Failed to load registrations</p>
        <p className="text-sm text-gray-500">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hackathon Registrations</h1>
        <p className="text-gray-600 mt-1">Manage and review all hackathon team registrations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter("all")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Teams</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Trophy className="w-10 h-10 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter("pending")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter("verified")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Verified</p>
                <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter("rejected")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

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
              className={filter === "pending" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
            >
              <Clock className="w-4 h-4 mr-2" />
              Pending ({stats.pending})
            </Button>
            <Button
              variant={filter === "verified" ? "default" : "outline"}
              onClick={() => setFilter("verified")}
              className={filter === "verified" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Verified ({stats.verified})
            </Button>
            <Button
              variant={filter === "rejected" ? "default" : "outline"}
              onClick={() => setFilter("rejected")}
              className={filter === "rejected" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              <XCircle className="w-4 h-4 mr-2" />
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
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Trophy className="w-16 h-16 text-gray-300" />
              <p className="text-lg font-semibold text-gray-500">No registrations found</p>
              <p className="text-sm text-gray-400">
                {filter === "all" 
                  ? "No teams have registered yet" 
                  : `No ${filter} registrations`}
              </p>
            </div>
          ) : (
            <div className="border rounded-lg">
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
                      <TableCell className="font-medium">{registration.teamName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{registration.teamLeaderName}</p>
                          <p className="text-xs text-gray-500">{registration.teamLeaderEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{registration.institute}</p>
                          <p className="text-xs text-gray-500">{registration.branch}</p>
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
                        {new Date(registration.createdAt).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell>
                        <RegistrationDetailsDialog registration={registration} />
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
