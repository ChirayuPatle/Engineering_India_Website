"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  gradientVariant?: "default" | "cool" | "warm" | "green";
  circle?: boolean;
  circleClasses?: string;
}

export default function Section({
  children,
  className,
  gradientVariant = "default",
  circle = true,
  circleClasses,

}: SectionProps) {
  const gradientMap = {
    default: "bg-gradient-to-b from-white to-w",
    cool: "bg-gradient-to-r from-blue-100 to-purple-100",
    warm: "bg-gradient-to-r from-yellow-400 via-red-800 to-pink-800",
    green: "bg-gradient-to-b from-green-400 to-green-700",
  };

  const bgClasses = gradientMap[gradientVariant];

  const leftCircleClasses = cn(
    // Mobile:
    "absolute bottom-[2rem] w-[40rem] h-[40rem] ",
    // Desktop:
    "md:bottom-[-10rem] md:left-[-22rem] md:w-[60rem] md:h-[60rem]",
    // permament styles
    "rounded-full bg-gradient-to-r blur-[9rem] from-blue-600 to-blue-950 opacity-30 pointer-events-none",
  );

  const rightCircleClasses = cn(
    // Mobile:
    "absolute bottom-[2rem] w-[40rem] h-[40rem]",
    // Desktop:
    "md:bottom-[-10rem] md:right-[-22rem] md:w-[60rem] md:h-[60rem]",
    // permament styles
    "rounded-full bg-gradient-to-r blur-[7rem] sm:blur-[9rem] from-blue-600 to-blue-950 opacity-30 pointer-events-none",
  );

  return (
    <div
      className={cn(
        "relative z-40 w-full overflow-hidden",
        bgClasses,
        className,
      )}
    >
      {circle && (
        <>
          <div className={cn("z-30", leftCircleClasses, circleClasses)} />
          <div className={cn("z-30", rightCircleClasses, circleClasses)} />
        </>
      )}
      {children}
    </div>
  );
}
