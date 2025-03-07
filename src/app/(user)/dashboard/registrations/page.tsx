import {
  CalendarIcon,
  Clock,
  Download,
  ExternalLink,
  MapPin,
} from "lucide-react";

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

const registeredEvents = [
  {
    id: 1,
    title: "Web Development Workshop",
    description:
      "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
    date: "March 15, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Computer Science Building, Room 101",
    status: "upcoming",
    ticketId: "WDW-2025-1234",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Introduction to Machine Learning",
    description:
      "A beginner-friendly introduction to machine learning concepts and applications.",
    date: "February 10, 2025",
    time: "4:00 PM - 6:00 PM",
    location: "Computer Science Building, Room 203",
    status: "completed",
    ticketId: "IML-2025-5678",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "GitHub Workshop",
    description:
      "Learn how to use Git and GitHub for version control and collaboration.",
    date: "January 25, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Computer Science Building, Lab 102",
    status: "completed",
    ticketId: "GHW-2025-9012",
    image: "/placeholder.svg?height=200&width=400",
  },
];

export default function RegisteredEventsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-6">
          {registeredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="h-48 w-full object-cover md:h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{event.title}</CardTitle>
                      {event.status === "upcoming" ? (
                        <Badge className="bg-blue-500 hover:bg-blue-500">
                          Upcoming
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
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2 md:grid-cols-2">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">Ticket ID:</span>
                      <span className="ml-2">{event.ticketId}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Ticket
                    </Button>
                    {event.status === "upcoming" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Certificate
                      </Button>
                    )}
                    {event.status === "upcoming" && (
                      <Button variant="destructive" size="sm">
                        Cancel Registration
                      </Button>
                    )}
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
