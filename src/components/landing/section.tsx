"use client";

import React from "react";
import { cn } from "@/lib/utils";
import CloudDecorations from "./CloudDecorations";

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  gradientVariant?: "default" | "cool" | "warm" | "green";
  circle?: boolean;
  clouds?: boolean | "low" | "medium" | "high";
}

export default function Section({
  children,
  className,
  gradientVariant = "default",
  circle = true,
  clouds = false,
}: SectionProps) {
  const gradientMap = {
    default: "bg-gradient-to-b from-white to-white",
    cool: "bg-gradient-to-r from-blue-100 to-purple-100",
    warm: "bg-gradient-to-r from-yellow-400 via-red-800 to-pink-800",
    green: "bg-gradient-to-b from-green-400 to-green-700",
  };

  const bgClasses = gradientMap[gradientVariant];
  const cloudDensity = clouds === true ? "medium" : clouds || "medium";

  return (
    <div
      className={cn(
        "relative z-40 w-full overflow-hidden",
        bgClasses,
        className,
      )}
    >
      {clouds && <CloudDecorations density={cloudDensity} />}
      {circle && (
        <>
          {/* <div className={cn("z-10", leftCircleClasses, circleClasses)} /> */}
          {/* <div className={cn("z-10", rightCircleClasses, circleClasses)} /> */}
        </>
      )}
      {children}
    </div>
  );
}
