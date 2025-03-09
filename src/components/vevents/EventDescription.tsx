"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type Event } from "@/context/eventContext";

interface EventDescriptionProps {
  event: Event;
}

const EventDescription = ({ event }: EventDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const isLongDescription = event.description.length > 300;

  return (
    <section className="animate-slide-up">
      <h2 className="section-title">About</h2>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div
          className={cn(
            "prose max-w-none text-gray-700",
            !expanded && isLongDescription && "line-clamp-4",
          )}
        >
          {event.description.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {isLongDescription && (
          <Button
            variant="ghost"
            onClick={toggleExpanded}
            className="text-event-purple hover:text-event-dark-purple hover:bg-event-light-purple/50 mt-2 flex items-center gap-1"
          >
            {expanded ? (
              <>
                <span>Show less</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Read more</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </section>
  );
};

export default EventDescription;
