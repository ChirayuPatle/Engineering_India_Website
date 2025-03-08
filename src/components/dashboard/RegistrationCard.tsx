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

export interface Registration {
  id: string;
  image?: string;
  title: string;
  status: "upcoming" | "completed" | "pending";
  description: string;
  date: string;
  time: string;
  location: string;
  ticketId: string;
}

const RegistrationCard = ({ reg }: { reg: Registration }) => {
  return (
    <Card
      key={reg.id}
      className="overflow-hidden rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        {/* Event Image */}
        <div className="md:w-1/3">
          <img
            src={reg.image || "/placeholder.svg"}
            alt={reg.title}
            className="h-48 w-full object-cover md:h-full"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>{reg.title}</CardTitle>
              {reg.status === "upcoming" ? (
                <Badge className="border border-zinc-800 bg-neutral-200/80 text-neutral-800 hover:bg-neutral-200">
                  Upcoming
                </Badge>
              ) : reg.status === "pending" ? (
                <Badge className="border border-yellow-800 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  Pending
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                >
                  Completed
                </Badge>
              )}
            </div>
            <CardDescription>{reg.description}</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-2 md:grid-cols-2">
            <div className="flex items-center text-sm">
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{reg.date}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{reg.time}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{reg.location}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="font-medium">Ticket ID:</span>
              <span className="ml-2">{reg.ticketId}</span>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2">
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
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default RegistrationCard;
