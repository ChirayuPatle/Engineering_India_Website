import "@/styles/globals.css";

import { DM_Sans } from "next/font/google";

import { Navigation } from "@/components/events/navigation";
import { type Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  );
}
