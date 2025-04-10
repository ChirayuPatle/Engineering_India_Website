"use client";

import { EventProvider } from "@/context/eventContext";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <EventProvider>{children}</EventProvider>;
}
