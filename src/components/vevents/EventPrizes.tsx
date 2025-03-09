"use client"

import { Card, CardContent } from "@/components/ui/card";
import { type Event } from "@/context/eventContext";
import { Trophy } from "lucide-react";

interface EventPrizesProps {
  event: Event;
}

const EventPrizes = ({ event }: EventPrizesProps) => {
  if (!event.prizes || event.prizes.length === 0) {
    return null;
  }

  return (
    <section className="animate-slide-up">
      <h2 className="section-title">Prizes</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {event.prizes.map((prize, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="bg-event-light-purple p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-event-purple" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{prize.position}</h3>
                  <p className="text-gray-600 text-sm mt-1">{prize.description}</p>
                  {prize.value && (
                    <p className="text-event-purple font-medium mt-2">{prize.value}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default EventPrizes;
