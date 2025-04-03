import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans } from "next/font/google";

import Navbar from "@/components/landing/navbar";
import Footer from "@/components/ui/Footer";
import { EventProvider } from "@/context/eventContext";
import { UserProvider } from "@/context/userContext";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Engineering India | YCCE",
  description:
    "A national level club, which aims to foster innovation and social responsibility, focuses on the overall development of students through various technical and social activities.",
  icons: [{ rel: "icon", url: "/logo1.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <UserProvider>
      <EventProvider>
        <html lang="en" className={`${dmsans.variable}`}>
          <body className="space">
            <Navbar />
            <Toaster position="top-center" />
            {children}
            <Analytics />
            <SpeedInsights />
            <Footer />
          </body>
        </html>
      </EventProvider>
    </UserProvider>
  );
}
