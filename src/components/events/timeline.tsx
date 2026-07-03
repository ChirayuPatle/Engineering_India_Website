import { Card } from "@/components/ui/card";

const schedule = [
  {
    date: "Feb 23, 2025",
    events: [
      {
        time: "09:00 AM",
        title: "Registration & Check-in",
        description: "Pick up your badges and welcome kit",
      },
      {
        time: "10:30 AM",
        title: "Opening Ceremony",
        description: "Welcome address and keynote speakers",
      },
    ],
  },
  {
    date: "Feb 24-28, 2025",
    events: [
      {
        time: "All Day",
        title: "Hacking Period",
        description: "Teams work on their projects",
      },
      {
        time: "Various Times",
        title: "Workshops & Mentoring",
        description: "Technical workshops and mentoring sessions",
      },
    ],
  },
  {
    date: "Mar 1, 2025",
    events: [
      {
        time: "10:00 AM",
        title: "Project Submissions",
        description: "Final submission deadline",
      },
      {
        time: "02:00 PM",
        title: "Project Showcase",
        description: "Teams present their projects",
      },
      {
        time: "06:00 PM",
        title: "Closing Ceremony",
        description: "Prize announcements and celebrations",
      },
    ],
  },
];

export function Timeline() {
  return (
    <div className="space-y-8">
      {schedule.map((day) => (
        <Card key={day.date} className="p-6">
          <h3 className="mb-4 text-xl font-bold">{day.date}</h3>
          <div className="space-y-4">
            {day.events.map((event) => (
              <div key={event.time} className="flex gap-4">
                <div className="w-24 font-medium">{event.time}</div>
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
