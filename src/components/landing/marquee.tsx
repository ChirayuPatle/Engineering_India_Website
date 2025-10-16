"use client";

import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnnouncementMarquee() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has previously dismissed the marquee
    const isDismissed = localStorage.getItem("marquee-dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleClick = () => {
    router.push("/prarambh");
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    // Store dismissal in localStorage so it doesn't show again
    localStorage.setItem("marquee-dismissed", "true");
  };

  return (
    <>
      {isVisible && (
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 py-3 text-white">
          <div 
            className="animate-marquee cursor-pointer whitespace-nowrap"
            onClick={handleClick}
          >
            <span className="mx-8 inline-flex items-center text-lg font-semibold">
              <Sparkles className="mr-2 h-5 w-5" />
              🎉 EI YCCE Flagship Event is Here!
            </span>
            <span className="mx-8 inline-flex items-center text-lg font-semibold">
              🚀 Prarambh 2025 - Register Now!
            </span>
            <span className="mx-8 inline-flex items-center text-lg font-semibold">
              🏆 Hackathon 2025 - Nov 1st, 2025
            </span>
            <span className="mx-8 inline-flex items-center text-lg font-semibold">
              ⚡ Limited Seats - Don't Miss Out!
            </span>
            <span className="mx-8 inline-flex items-center text-lg font-semibold">
              <Sparkles className="mr-2 h-5 w-5" />
              🎉 EI YCCE Flagship Event is Here!
            </span>
            <span className="mx-8 inline-flex items-center text-lg font-semibold">
              🚀 Prarambh 2025 - Register Now!
            </span>
            <span className="mx-8 inline-flex items-center text-lg font-semibold">
              🏆 Hackathon 2025 - Nov 1st, 2025
            </span>
            <span className="mx-8 inline-flex items-center text-lg font-semibold">
              ⚡ Limited Seats - Don't Miss Out!
            </span>
          </div>
          <button
            onClick={handleClose}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-1 transition-colors hover:bg-white/30"
            aria-label="Close announcement"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
