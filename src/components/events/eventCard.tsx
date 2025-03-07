"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  href: string;
}

export function EventCard({
  title,
  date,
  location,
  description,
  imageUrl,
  href,
}: EventCardProps) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(href)} className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-lg">
      <div className="aspect-[16/9] overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={225}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <Typography as="h3" className="line-clamp-1">
          {title}
        </Typography>
        <div className="mt-2 flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPinIcon className="h-4 w-4" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
        <Typography as="p" className="mt-2 line-clamp-2 text-muted-foreground">
          {description}
        </Typography>
        <div className="mt-4">
          <Button variant="default" className="w-full">
            <Link href={href}>Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
