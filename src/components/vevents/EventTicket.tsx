"use client"

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
      navigator.share({
        title: `Ticket for ${ticket.eventTitle}`,
        text: `Join me at ${ticket.eventTitle} on ${ticket.startDate}!`,
        url: window.location.href,
      }).catch(err => {
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
      <div className="bg-event-light-purple p-4 rounded-lg mb-6 flex items-center gap-3">
        <div className="bg-green-100 rounded-full p-1">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Registration successful!</h3>
          <p className="text-sm text-gray-600">Your ticket has been generated.</p>
        </div>
      </div>
      
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-event-purple text-white p-4 text-center">
          <h3 className="text-xl font-bold">EVENT TICKET</h3>
        </div>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{ticket.eventTitle}</h2>
                <p className="text-gray-600">{ticket.startDate}</p>
              </div>
              
              <div className="space-y-3 mt-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Attendee</h4>
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
                  <h4 className="text-sm font-medium text-gray-500">Ticket ID</h4>
                  <p className="font-mono text-sm">{ticket.ticketId}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm">
              <QRCodeGenerator value={ticket.qrCode} size={160} className="mb-3" />
              <p className="text-xs text-center text-gray-500">Scan for entry</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-end">
            <Button
              variant="outline"
              onClick={handleShare}
              className="border-event-purple text-event-purple hover:bg-event-light-purple/50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-event-purple hover:bg-event-dark-purple"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventTicket;
