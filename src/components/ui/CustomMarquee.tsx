"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CustomMarqueeProps {
  className?: string;
  children: React.ReactNode;
  repeat?: number;
}

const CustomMarquee: React.FC<CustomMarqueeProps> = ({
  className,
  children,
  repeat = 2,
}) => {
  const marqueeContent = (
    <div className="flex items-center">
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="whitespace-nowrap px-6 py-2">
            {children}
          </div>
        ))}
    </div>
  );

  return (
    <div className={cn("relative flex w-full overflow-hidden", className)}>
      <div className="flex min-w-full shrink-0 animate-marquee items-center">
        {marqueeContent}
      </div>
      <div
        aria-hidden="true"
        className="absolute flex min-w-full shrink-0 animate-marquee items-center"
      >
        {marqueeContent}
      </div>
    </div>
  );
};

export default CustomMarquee;
