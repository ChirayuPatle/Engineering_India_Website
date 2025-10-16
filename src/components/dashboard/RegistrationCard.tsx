"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  Clock,
  Download,
  ExternalLink,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export interface Registration {
  id: string;
  type?: "event" | "hackathon";
  image?: string | null;
  title: string;
  status: "upcoming" | "completed" | "pending" | "rejected";
  description: string;
  date: string;
  time: string;
  location: string;
  ticketId: string;
  teamName?: string;
  paymentStatus?: string;
  createdAt?: Date;
}

const RegistrationCard = ({ reg }: { reg: Registration }) => {
  const isHackathon = reg.type === "hackathon";

  return (
    <Card
      key={reg.id}
      className="overflow-hidden rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        {/* Event Image */}
        {!isHackathon && (
          <div className="relative md:w-1/3">
            <Image
              src={reg.image || "/placeholder.svg"}
              alt={reg.title}
              fill
              className="h-48 w-full object-cover md:h-full"
              priority
            />
          </div>
        )}

        <div className="flex flex-1 flex-col">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="break-words">
                {isHackathon && "🚀 "}
                {reg.title}
              </CardTitle>
              {reg.status === "upcoming" ? (
                <Badge className="flex-shrink-0 border border-zinc-800 bg-neutral-200/80 text-neutral-800 hover:bg-neutral-200">
                  {isHackathon ? "Verified" : "Upcoming"}
                </Badge>
              ) : reg.status === "pending" ? (
                <Badge className="flex-shrink-0 border border-yellow-800 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  Pending
                </Badge>
              ) : reg.status === "rejected" ? (
                <Badge className="flex-shrink-0 border border-red-800 bg-red-100 text-red-800 hover:bg-red-100">
                  Rejected
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="flex-shrink-0 bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                >
                  Completed
                </Badge>
              )}
            </div>
            <CardDescription className="break-words">
              {reg.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-2 md:grid-cols-2">
            {!isHackathon && (
              <>
                <div className="flex items-center text-sm">
                  <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <span>{reg.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <span>{reg.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <span>{reg.location}</span>
                </div>
              </>
            )}
            <div className="col-span-full flex items-center text-sm">
              <span className="font-medium">
                {isHackathon ? "Registration ID:" : "Ticket ID:"}
              </span>
              <span className="ml-2 break-all">{reg.ticketId}</span>
            </div>
            {isHackathon && reg.createdAt && (
              <div className="col-span-full flex items-center text-sm">
                <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span>
                  Registered on{" "}
                  {new Date(reg.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2">
            {isHackathon ? (
              <>
                {reg.status === "upcoming" ? (
                  <Badge className="border-green-300 bg-green-100 text-green-800">
                    ✓ Payment Verified - All Set!
                  </Badge>
                ) : reg.status === "pending" ? (
                  <Badge className="border-yellow-300 bg-yellow-100 text-yellow-800">
                    ⏳ Payment Under Review
                  </Badge>
                ) : reg.status === "rejected" ? (
                  <Badge className="border-red-300 bg-red-100 text-red-800">
                    ✗ Payment Rejected - Contact Support
                  </Badge>
                ) : null}
              </>
            ) : (
              <>
                {reg.status === "upcoming" ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex w-full items-center sm:w-auto"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Ticket
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex w-full items-center sm:w-auto"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </>
                ) : reg.status === "pending" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="flex w-full cursor-not-allowed items-center opacity-50 sm:w-auto"
                  >
                    Pending Approval
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex w-full items-center sm:w-auto"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                )}
              </>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default RegistrationCard;
