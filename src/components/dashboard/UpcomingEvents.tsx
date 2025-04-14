import { CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
}

interface UpcomingEventsProps {
  events: UpcomingEvent[];
  onViewAll: () => void;
}

export function UpcomingEvents({ events, onViewAll }: UpcomingEventsProps) {
  return (
    <Card className="col-span-3 ">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Upcoming Events</CardTitle>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                  <CalendarClock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
              <Badge variant="outline">{event.category}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
