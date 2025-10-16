"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Award, CheckCircle, Clock, XCircle, Calendar, Building, GraduationCap, MapPin, Trophy, DollarSign } from "lucide-react";

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

export function HackathonRegistrationCard({ registration }: HackathonRegistrationCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          label: "Payment Verified",
          className: "bg-green-100 text-green-800 border-green-300",
          description: "Your payment has been verified. You're all set!",
        };
      case "rejected":
        return {
          icon: <XCircle className="w-5 h-5" />,
          label: "Payment Rejected",
          className: "bg-red-100 text-red-800 border-red-300",
          description: "Your payment was rejected. Please contact support.",
        };
      default:
        return {
          icon: <Clock className="w-5 h-5" />,
          label: "Payment Pending",
          className: "bg-yellow-100 text-yellow-800 border-yellow-300",
          description: "Your payment is under review. We'll update you soon.",
        };
    }
  };

  const statusConfig = getStatusConfig(registration.status);
  const totalMembers = registration.teamMembers.length + 1;

  return (
    <Card className="border-gray-200 overflow-hidden">
      {/* Payment Status Banner */}
      <div className={`${statusConfig.className} border-b px-4 py-2.5`}>
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">{statusConfig.icon}</div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm truncate">{statusConfig.label}</h3>
            <p className="text-xs opacity-90 line-clamp-1">{statusConfig.description}</p>
          </div>
        </div>
      </div>

      <CardHeader className="border-b border-gray-100 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-black flex-shrink-0" />
              <span className="truncate">{registration.teamName}</span>
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs mt-1">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span>{new Date(registration.createdAt).toLocaleDateString('en-GB')}</span>
            </CardDescription>
          </div>
          <Badge className="bg-black text-white text-xs px-2 py-0.5 flex-shrink-0">
            {totalMembers}/4
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-3 space-y-3">
        {/* Team Leader Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 flex items-center gap-1.5 text-sm">
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            Team Leader
          </h3>
          <div className="bg-gray-50 rounded-lg p-2.5 space-y-1.5 text-xs">
            <div className="flex justify-between gap-2">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="text-gray-900 text-right truncate">{registration.teamLeaderName}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-900 text-right truncate">{registration.teamLeaderEmail}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="text-gray-900">{registration.teamLeaderPhone}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-gray-200">
              <div>
                <span className="text-gray-500 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  {registration.branch}
                </span>
              </div>
              <div>
                <span className="text-gray-500">{registration.year} Year</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-1 border-t border-gray-200">
              <Building className="w-3 h-3 text-gray-500 flex-shrink-0" />
              <span className="text-gray-900 truncate">{registration.institute}</span>
            </div>
          </div>
        </div>

        {/* Team Members */}
        {registration.teamMembers.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 flex items-center gap-1.5 text-sm">
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              Team Members ({registration.teamMembers.length})
            </h3>
            <div className="space-y-2">
              {registration.teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2.5 text-xs">
                  <div className="font-medium text-gray-900 mb-1.5">
                    {index + 1}. {member.name}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-gray-600">
                    <div className="truncate">{member.email}</div>
                    <div>{member.phone}</div>
                    <div className="truncate">{member.branch}</div>
                    <div>{member.year} Year</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Info */}
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm">Payment Details</h3>
          <div className="bg-gray-50 rounded-lg p-2.5 space-y-2 text-xs">
            {registration.transactionId && (
              <div className="flex justify-between gap-2">
                <span className="font-medium text-gray-600">Transaction ID:</span>
                <span className="text-gray-900 font-mono truncate">{registration.transactionId}</span>
              </div>
            )}
            {registration.paymentScreenshot && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(registration.paymentScreenshot!, '_blank')}
                className="w-full text-xs h-8"
              >
                View Screenshot
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
