"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AnnouncementMarquee() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the marquee
    const isDismissed = localStorage.getItem("marquee-dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    // Store dismissal in localStorage so it doesn't show again
    localStorage.setItem("marquee-dismissed", "true");
  };

  return (
    <>
      {isVisible && (
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 py-1 text-white sm:py-2">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            <span className="mx-4 inline-flex items-center text-sm font-semibold sm:mx-8 sm:text-base md:text-lg">
              <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              🎉 EI YCCE Flagship Event is Here!
            </span>
            <Link
              href="/prarambh"
              className="mx-4 inline-flex cursor-pointer items-center text-sm font-semibold hover:underline sm:mx-8 sm:text-base md:text-lg"
            >
              🚀 Prarambh 2025 - Register Now!
            </Link>
            <Link
              href="/events/hackathon"
              className="mx-4 inline-flex cursor-pointer items-center text-sm font-semibold hover:underline sm:mx-8 sm:text-base md:text-lg"
            >
              🏆 Hackathon 2025 - Nov 1st, 2025
            </Link>
            <Link
              href="/events"
              className="mx-4 inline-flex cursor-pointer items-center text-sm font-semibold hover:underline sm:mx-8 sm:text-base md:text-lg"
            >
              ⚡ Limited Seats - Don't Miss Out!
            </Link>
            <span className="mx-4 inline-flex items-center text-sm font-semibold sm:mx-8 sm:text-base md:text-lg">
              <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              🎉 EI YCCE Flagship Event is Here!
            </span>
            <Link
              href="/prarambh"
              className="mx-4 inline-flex cursor-pointer items-center text-sm font-semibold hover:underline sm:mx-8 sm:text-base md:text-lg"
            >
              🚀 Prarambh 2025 - Register Now!
            </Link>
            <Link
              href="/events/hackathon"
              className="mx-4 inline-flex cursor-pointer items-center text-sm font-semibold hover:underline sm:mx-8 sm:text-base md:text-lg"
            >
              🏆 Hackathon 2025 - Nov 1st, 2025
            </Link>
            <Link
              href="/events"
              className="mx-4 inline-flex cursor-pointer items-center text-sm font-semibold hover:underline sm:mx-8 sm:text-base md:text-lg"
            >
              ⚡ Limited Seats - Don't Miss Out!
            </Link>
          </div>
          <button
            onClick={handleClose}
            className="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/20 p-1.5 transition-colors hover:bg-white/30 sm:p-2"
            aria-label="Close announcement"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
