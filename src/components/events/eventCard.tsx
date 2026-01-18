"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

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
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setFormattedDate(
      date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, [date]);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all"
    >
      {/* Image Section */}
      <div className="aspect-[16/10] w-full overflow-hidden rounded-[24px]">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-5 pt-6">
        <div>
          <h3 className="font-fraunces mb-3 line-clamp-1 text-xl font-semibold text-white md:text-2xl">
            {title}
          </h3>

          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/50">
              <CalendarIcon className="h-3.5 w-3.5" />
              <span className="font-sans text-xs" suppressHydrationWarning>
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <MapPinIcon className="h-3.5 w-3.5" />
              <span className="font-sans text-xs">{location}</span>
            </div>
          </div>

          <p className="mb-6 line-clamp-2 font-sans text-sm leading-relaxed text-white/60">
            {description}
          </p>
        </div>

        <Button variant="premium" className="group/btn w-full rounded-xl py-6">
          <span className="flex items-center justify-center gap-2 text-sm font-bold">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
        </Button>
      </div>
    </motion.div>
  );
}
