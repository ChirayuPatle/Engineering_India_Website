import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";

import { EventProvider } from "@/context/eventContext";
// import { UserProvider } from "@/context/userContext";
import { ReactQueryProvider } from "@/context/providers/query-provider";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { UnregisterServiceWorker } from "@/components/UnregisterServiceWorker";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { ConditionalLayout } from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    // <UserProvider>
    <ReactQueryProvider>
      <EventProvider>
        <html lang="en" className={`${inter.variable}`}>
          <body className={`${inter.className} space`}>
            <UnregisterServiceWorker />
            <Toaster position="top-center" />
            <SonnerToaster position="top-center" richColors />
            <ConditionalLayout>{children}</ConditionalLayout>
            <Analytics />
            <SpeedInsights />
          </body>
        </html>
      </EventProvider>
    </ReactQueryProvider>
    // </UserProvider>
  );
}
