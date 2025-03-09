import "@/styles/globals.css";

import { DM_Sans } from "next/font/google";

import Navbar from "@/components/landing/navbar";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/userContext";
import Footer from "@/components/ui/Footer";
import { type Metadata } from "next";
import { EventProvider } from "@/context/eventContext";

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Engineering India | YCCE",
  description:
    "A national level club, which aims to foster innovation and social responsibility, focuses on the overall development of students through various technical and social activities.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
            <Footer />
          </body>
        </html>
      </EventProvider>
    </UserProvider>
  );
}



