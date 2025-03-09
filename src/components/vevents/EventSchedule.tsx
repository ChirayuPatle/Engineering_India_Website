"use client";

import { type Event } from "@/context/eventContext";
import { Clock, MapPin } from "lucide-react";

interface EventScheduleProps {
  event: Event;
}

const EventSchedule = ({ event }: EventScheduleProps) => {
  if (!event.schedule || event.schedule.length === 0) {
    return null;
  }

  return (
    <section className="animate-slide-up">
      <h2 className="section-title">Schedule</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute bottom-2 left-3 top-2 w-0.5 bg-gray-200"></div>

        <div className="relative space-y-8 pl-10">
          {event.schedule.map((item, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-[-29px] top-1 z-10 h-6 w-6 rounded-full border-4 border-white bg-black"></div>

              <div className="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-bold">{item.time}</div>
                  <div className="text-lg font-medium">{item.activity}</div>

                  {item.location && (
                    <div className="mt-1 flex items-center gap-1 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;
