"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCodeGenerator from "./QRCodeGenerator";
import { type Ticket } from "@/lib/event-types";
// import { useToast } from "@/hooks/use-toast";

interface EventTicketProps {
  ticket: Ticket;
}

const EventTicket = ({ ticket }: EventTicketProps) => {
  // const { toast } = useToast();

  const handleDownload = () => {
    // In a real app, this would generate a PDF or image
    // toast({
    //   title: "Download started",
    //   description: "Your ticket is being downloaded.",
    // });
    alert("Download started. Your ticket is being downloaded.");
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator
        .share({
          title: `Ticket for ${ticket.eventTitle}`,
          text: `Join me at ${ticket.eventTitle} on ${ticket.startDate}!`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Share failed:", err);
        });
    } else {
      // toast({
      //   title: "Sharing not supported",
      //   description: "Your browser doesn't support sharing.",
      // });
      alert("Sharing not supported. Your browser doesn't support sharing.");
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-event-light-purple mb-6 flex items-center gap-3 rounded-lg p-4">
        <div className="rounded-full bg-green-100 p-1">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            Registration successful!
          </h3>
          <p className="text-sm text-gray-600">
            Your ticket has been generated.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-event-purple p-4 text-center text-white">
          <h3 className="text-xl font-bold">EVENT TICKET</h3>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-4 md:col-span-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {ticket.eventTitle}
                </h2>
                <p className="text-gray-600">{ticket.startDate}</p>
              </div>

              <div className="mt-6 space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Attendee
                  </h4>
                  <p className="font-medium">{ticket.attendeeName}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p>{ticket.attendeeEmail}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Venue</h4>
                  <p>{ticket.venue}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Ticket ID
                  </h4>
                  <p className="font-mono text-sm">{ticket.ticketId}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-sm">
              <QRCodeGenerator
                value={ticket.qrCode}
                size={160}
                className="mb-3"
              />
              <p className="text-center text-xs text-gray-500">
                Scan for entry
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-end">
            <Button
              variant="outline"
              onClick={handleShare}
              className="border-event-purple text-event-purple hover:bg-event-light-purple/50"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-event-purple hover:bg-event-dark-purple"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventTicket;
