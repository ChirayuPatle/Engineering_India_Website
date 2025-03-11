"use client";

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
                <div className="bg-event-light-purple rounded-full p-2">
                  <Trophy className="text-event-purple h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{prize.position}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {prize.description}
                  </p>
                  {prize.value && (
                    <p className="text-event-purple mt-2 font-medium">
                      {prize.value}
                    </p>
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
