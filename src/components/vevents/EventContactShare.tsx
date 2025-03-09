"use client";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Globe,
  Share2,
  Linkedin,
  Twitter,
  MessageSquare,
  Copy,
  CalendarPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// import { Event } from '@/types/event';
// import { useToast } from '@/hooks/use-toast';
import { type Event } from "@/context/eventContext";

interface EventContactShareProps {
  event: Event;
}

const EventContactShare = ({ event }: EventContactShareProps) => {
  const [shareOpen, setShareOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const { toast } = useToast();

  // Determine if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shareUrl = window.location.href;
  const eventHasPassed = new Date(event.end_date || "") < new Date();

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=Check out this event: ${encodeURIComponent(event.title)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: MessageSquare,
      url: `https://wa.me/?text=${encodeURIComponent(`Check out this event: ${event.title} ${shareUrl}`)}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    // toast({
    //   title: 'Link copied',
    //   description: 'Event link has been copied to clipboard.',
    // });
    alert("Link copied");
  };

  if (!event.organizer) {
    return null;
  }

  // Mobile sticky footer
  if (isMobile) {
    return (
      <>
        <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between bg-white p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          {!eventHasPassed ? (
            <>
              <Button
                onClick={() =>
                  document
                    .getElementById("registration")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mr-2 flex-1 bg-black hover:bg-gray-800"
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
              <Button
                onClick={() => setShareOpen(true)}
                variant="outline"
                className="px-4"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setShareOpen(true)}
              className="w-full bg-black hover:bg-gray-800"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Event
            </Button>
          )}
        </div>

        {/* Add padding at the bottom of the page to account for the fixed footer */}
        <div className="h-16"></div>

        <Dialog open={shareOpen} onOpenChange={setShareOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share this event</DialogTitle>
              <DialogDescription>
                Share this event with your friends and network
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-4 py-4">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-gray-100"
                >
                  <div className="rounded-full bg-gray-100 p-3">
                    <link.icon className="h-5 w-5 text-gray-700" />
                  </div>
                  <span className="text-sm text-gray-700">{link.name}</span>
                </a>
              ))}
            </div>

            <div className="mt-2 flex items-center space-x-2 rounded-md border p-2">
              <input
                className="flex-1 border-none bg-transparent text-sm focus:outline-none"
                value={shareUrl}
                readOnly
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="gap-1"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Desktop version
  return (
    <>
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-bold text-gray-800">Contact Organizer</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gray-100 p-2">
              <Mail className="h-4 w-4 text-gray-700" />
            </div>
            <a
              href={`mailto:engineeringindiaycce@gmail.com`}
              className="text-gray-700 hover:text-black"
            >
              engineeringindiaycce@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gray-100 p-2">
              <Phone className="h-4 w-4 text-gray-700" />
            </div>
            <a
              href={`tel:8080808080`}
              className="text-gray-700 hover:text-black"
            >
              8080808080
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-bold text-gray-800">Share Event</h3>
        <Button
          onClick={() => setShareOpen(true)}
          className="flex w-full gap-2 bg-black hover:bg-gray-800"
        >
          <Share2 className="h-4 w-4" />
          Share This Event
        </Button>
      </div>

      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this event</DialogTitle>
            <DialogDescription>
              Share this event with your friends and network
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 py-4">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-gray-100"
              >
                <div className="rounded-full bg-gray-100 p-3">
                  <link.icon className="h-5 w-5 text-gray-700" />
                </div>
                <span className="text-sm text-gray-700">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="mt-2 flex items-center space-x-2 rounded-md border p-2">
            <input
              className="flex-1 border-none bg-transparent text-sm focus:outline-none"
              value={shareUrl}
              readOnly
            />
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-1"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventContactShare;
