"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  title: string;
  date: Date;
  location: string;
  description: string;
  imageUrl: string;
}

export function EventCard({
  title,
  date,
  location,
  description,
  imageUrl,
}: EventCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-background p-2 transition-all">
      {/* Image Section */}
      <div className="aspect-[16/9] w-full overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={225}
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-4">
        {/* Top: Title, Date, Location, Description */}
        <div>
          <Typography as="h3" className="line-clamp-1">
            {title}
          </Typography>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">{date.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          <Typography
            as="p"
            className="mt-2 line-clamp-2 text-muted-foreground"
          >
            {description}
          </Typography>
        </div>

        {/* Bottom: Button */}
        <div className="mt-4">
          <Button variant="default" className="w-full">
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
}
