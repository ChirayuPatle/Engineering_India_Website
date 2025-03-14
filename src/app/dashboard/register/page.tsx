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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const registrations = [
  {
    id: "r1",
    eventId: "1",
    eventName: "Tech Expo 2023",
    date: "Oct 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Main Campus, Building A",
    category: "Tech",
    registrationDate: "Oct 10, 2023",
    status: "confirmed",
    ticketId: "TCK-12345",
    paymentStatus: "paid",
    paymentId: "p1",
  },
  {
    id: "r2",
    eventId: "2",
    eventName: "Coding Workshop",
    date: "Oct 20, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Science Lab",
    category: "Workshop",
    registrationDate: "Oct 18, 2023",
    status: "confirmed",
    ticketId: "TCK-23456",
    paymentStatus: "pending",
    paymentId: "p2",
  },
];

const pastRegistrations = [
  {
    id: "r3",
    eventId: "old1",
    eventName: "Game Development Workshop",
    date: "Sep 15, 2023",
    time: "1:00 PM - 4:00 PM",
    location: "Computer Science Lab",
    category: "Workshop",
    registrationDate: "Sep 10, 2023",
    status: "completed",
    ticketId: "TCK-34567",
    paymentStatus: "paid",
    paymentId: "p4",
  },
];

export default function RegistrationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-600">
            Confirmed
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">My Registrations</h1>
      </div>

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {registrations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {registrations.map((reg) => (
                <Card className="shadow-none" key={reg.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{reg.eventName}</CardTitle>
                        <CardDescription>
                          Registered on {reg.registrationDate}
                        </CardDescription>
                      </div>
                      {getStatusBadge(reg.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{reg.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time:</span>
                        <span>{reg.time}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{reg.location}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Ticket ID:
                        </span>
                        <span className="font-mono">{reg.ticketId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Payment Status:
                        </span>
                        <Badge
                          variant={
                            reg.paymentStatus === "paid"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {reg.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/payments/${reg.paymentId}`)
                      }
                    >
                      View Payment
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(`/dashboard/events/${reg.eventId}`)
                      }
                    >
                      Event Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-8 w-8 text-muted-foreground/60" />
                <h3 className="mt-2 text-xl font-semibold">
                  No upcoming registrations
                </h3>
                <p className="text-sm text-muted-foreground">
                  You haven't registered for any upcoming events.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => router.push("/dashboard/events")}
                >
                  Browse Events
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastRegistrations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {pastRegistrations.map((reg) => (
                <Card key={reg.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{reg.eventName}</CardTitle>
                        <CardDescription>
                          Registered on {reg.registrationDate}
                        </CardDescription>
                      </div>
                      {getStatusBadge(reg.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{reg.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time:</span>
                        <span>{reg.time}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{reg.location}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Ticket ID:
                        </span>
                        <span className="font-mono">{reg.ticketId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Payment Status:
                        </span>
                        <Badge
                          variant={
                            reg.paymentStatus === "paid"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {reg.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/payments/${reg.paymentId}`)
                      }
                    >
                      View Payment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/events/${reg.eventId}`)
                      }
                    >
                      Event Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-8 w-8 text-muted-foreground/60" />
                <h3 className="mt-2 text-xl font-semibold">
                  No past registrations
                </h3>
                <p className="text-sm text-muted-foreground">
                  You don't have any completed event registrations.
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
