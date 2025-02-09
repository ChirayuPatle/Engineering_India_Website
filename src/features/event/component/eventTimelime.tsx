"use client";

import { motion } from "framer-motion";

export interface TimelineEvent {
  time: string;
  day: number;
  title: string;
}

interface EventTimelineProps {
  timeline: TimelineEvent[];
}

export default function EventTimeline({ timeline }: EventTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line in the center */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2" />
      <div className="space-y-6">
        {timeline.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`flex items-center gap-8 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1 md:text-right">
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Day {event.day} - {event.time}
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
              {event.day}
            </div>
            <div className="flex-1 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
