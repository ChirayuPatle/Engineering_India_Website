"use client";

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
  Users,
  Award,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  Building,
  MessageCircle,
  ExternalLink,
  Share2,
  FileText,
  Presentation,
  Download,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { EditTeamModal } from "./EditTeamModal";
import { useCurrentUser } from "@/hooks/use-user";

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
  createdAt: Date;
}

interface HackathonRegistrationCardProps {
  registration: HackathonRegistration;
}

export function HackathonRegistrationCard({
  registration,
}: HackathonRegistrationCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: user } = useCurrentUser();

  // Check if current user is the team leader
  const isTeamLeader =
    user?.email?.toLowerCase() === registration.teamLeaderEmail.toLowerCase();

  const handleEditSuccess = () => {
    // Force a re-fetch by reloading the page or triggering parent refresh
    window.location.reload();
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          label: "Verified",
          className: "bg-green-100 text-green-800 border-green-300",
        };
      case "rejected":
        return {
          icon: <XCircle className="h-4 w-4" />,
          label: "Rejected",
          className: "bg-red-100 text-red-800 border-red-300",
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          label: "Pending",
          className: "bg-yellow-100 text-yellow-800 border-yellow-300",
        };
    }
  };

  const statusConfig = getStatusConfig(registration.status);
  const totalMembers = registration.teamMembers.length + 1;

  return (
    <Card className="overflow-hidden border-gray-200">
      {/* Compact Status Banner */}
      <div className={`${statusConfig.className} border-b px-3 py-1.5`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {statusConfig.icon}
            <span className="text-xs font-semibold">{statusConfig.label}</span>
          </div>
          <Badge className="bg-black px-1.5 py-0 text-[10px] text-white">
            {totalMembers}/4
          </Badge>
        </div>
      </div>

      {/* Compact Header */}
      <CardHeader className="border-b border-gray-100 px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
              <Award className="h-3.5 w-3.5 flex-shrink-0 text-black" />
              <span className="truncate">{registration.teamName}</span>
            </CardTitle>
            <CardDescription className="mt-0.5 flex items-center gap-1 text-[10px]">
              <Calendar className="h-2.5 w-2.5 flex-shrink-0" />
              <span>
                {new Date(registration.createdAt).toLocaleDateString("en-GB")}
              </span>
            </CardDescription>
          </div>

          {/* Edit Button - Only visible to team leader */}
          {isTeamLeader && (
            <Button
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="h-8 flex-shrink-0 gap-1.5 bg-black px-3 font-semibold text-white shadow-md hover:bg-gray-800 hover:shadow-lg"
            >
              <Edit className="h-3.5 w-3.5" />
              <span className="hidden text-xs sm:inline">Edit</span>
              <span className="text-xs sm:hidden">✏️</span>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2.5 px-3 py-2.5">
        {/* Compact Team Leader Info */}
        <div className="space-y-1.5">
          <h3 className="flex items-center gap-1 text-xs font-semibold text-gray-900">
            <Users className="h-3 w-3 flex-shrink-0" />
            Leader
          </h3>
          <div className="space-y-1 rounded-lg bg-gray-50 p-2 text-[11px]">
            <div className="flex justify-between gap-2">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="truncate text-right font-medium text-gray-900">
                {registration.teamLeaderName}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="text-gray-900">
                {registration.teamLeaderPhone}
              </span>
            </div>
            <div className="flex items-center gap-1 border-t border-gray-200 pt-1">
              <Building className="h-2.5 w-2.5 flex-shrink-0 text-gray-500" />
              <span className="truncate text-gray-700">
                {registration.institute}
              </span>
            </div>
          </div>
        </div>

        {/* Compact Team Members */}
        {registration.teamMembers.length > 0 && (
          <div className="space-y-1.5">
            <h3 className="flex items-center gap-1 text-xs font-semibold text-gray-900">
              <Users className="h-3 w-3 flex-shrink-0" />
              Members ({registration.teamMembers.length})
            </h3>
            <div className="space-y-1.5">
              {registration.teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-1.5 text-[11px]"
                >
                  <div className="mb-0.5 font-medium text-gray-900">
                    {index + 1}. {member.name}
                  </div>
                  <div className="text-gray-600">{member.phone}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compact Payment Info */}
        {(registration.transactionId || registration.paymentScreenshot) && (
          <div className="space-y-1.5 border-t border-gray-200 pt-2">
            <h3 className="text-xs font-semibold text-gray-900">Payment</h3>
            <div className="space-y-1.5 rounded-lg bg-gray-50 p-2 text-[11px]">
              {registration.transactionId && (
                <div className="flex justify-between gap-2">
                  <span className="font-medium text-gray-600">Txn ID:</span>
                  <span className="truncate font-mono text-gray-900">
                    {registration.transactionId}
                  </span>
                </div>
              )}
              {registration.paymentScreenshot && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(registration.paymentScreenshot!, "_blank")
                  }
                  className="h-6 w-full text-[10px]"
                >
                  View Screenshot
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Compact WhatsApp Section */}
        <div className="space-y-1.5 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-2">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
              <MessageCircle className="h-3 w-3 text-white" />
            </div>
            <h3 className="text-xs font-bold text-gray-900">
              WhatsApp Community
            </h3>
          </div>

          <div className="flex gap-1.5">
            {/* Join Button */}
            <Button
              asChild
              className="h-7 flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-[10px] font-semibold text-white transition-all hover:from-green-700 hover:to-emerald-700"
            >
              <a
                href="https://chat.whatsapp.com/LGiIwAILD1eFxr1JEByQaJ?mode=wwc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
              >
                <MessageCircle className="h-3 w-3" />
                <span>Join</span>
              </a>
            </Button>

            {/* Share Button */}
            <Button
              variant="outline"
              size="sm"
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
              className="h-7 flex-1 border-green-600 text-[10px] text-green-700 hover:bg-green-50"
            >
              <Share2 className="mr-1 h-3 w-3" />
              Share
            </Button>
          </div>
        </div>

        {/* Hackathon Resources Section */}
        <div className="space-y-1.5 rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-2">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
              <FileText className="h-3 w-3 text-white" />
            </div>
            <h3 className="text-xs font-bold text-gray-900">
              Hackathon Resources
            </h3>
          </div>

          <div className="space-y-1.5">
            {/* Problem Statement Button */}
            <Button
              asChild
              className="h-7 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-[10px] font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700"
            >
              <a
                href="https://ebqqc80v6n.ufs.sh/f/JM14HErelurp3COQ4GZreWwRDjVmTxH78Zg9h2SoLPzfYcnO"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5"
              >
                <FileText className="h-3 w-3" />
                <span>Problem Statement PDF</span>
                <Download className="h-3 w-3" />
              </a>
            </Button>

            {/* PPT Template Button */}
            <Button
              asChild
              variant="outline"
              className="h-7 w-full border-blue-600 text-[10px] font-semibold text-blue-700 hover:bg-blue-50"
            >
              <a
                href="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpT3vkgSCi2sQWEHSqZvXNzw7a9RGxg6U5LD3u"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5"
              >
                <Presentation className="h-3 w-3" />
                <span>PPT Template</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>

          <p className="text-[10px] leading-relaxed text-gray-600">
            📄 Download the problem statement and use our PPT template for your
            presentation
          </p>
        </div>
      </CardContent>

      {/* Edit Team Modal */}
      <EditTeamModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        registrationId={registration.id}
        currentTeamName={registration.teamName}
        currentLeaderDetails={{
          name: registration.teamLeaderName,
          phone: registration.teamLeaderPhone,
          gender: registration.teamLeaderGender,
          institute: registration.institute,
          branch: registration.branch,
          year: registration.year,
        }}
        currentMembers={registration.teamMembers}
        onSuccess={handleEditSuccess}
      />
    </Card>
  );
}
