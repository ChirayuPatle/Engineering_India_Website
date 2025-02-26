"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Optional: if you want to merge classes

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A responsive container component that mimics the spacing of the navbar.
 * It centers the content with a maximum width and horizontal padding.
 */
export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      id="page1"
      className={cn(
        "container mx-auto w-full max-w-[80%] px-4 text-black",
        className,
      )}
    >
      {children}
    </div>
  );
}
