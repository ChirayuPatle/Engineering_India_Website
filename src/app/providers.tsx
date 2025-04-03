"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import { UserProvider } from "@/context/userContext";
import { EventProvider } from "@/context/eventContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <EventProvider>{children}</EventProvider>
      </UserProvider>
    </SessionProvider>
  );
}
