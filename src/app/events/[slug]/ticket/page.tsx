"use client";

import { Button } from "@/components/ui/button";
import { type Event } from "@/context/eventContext";
import { useUser } from "@/context/userContext";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Loader,
  MapPin,
  Share2,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface EventTicketProps {
  event: Event;
  ticketId: string;
}

const EventTicket: React.FC<EventTicketProps> = () => {
  // Example event data
  const event = {
    event_id: "8b36866b-1876-466c-9a60-9b0d48840580",
    event_title: "Ultimate Socio Technocrat",
    event_start_date: "7:00 am",
    event_end_date: "12-22-50",
    event_venue: "Los Santos",
  };

  const { user } = useUser();
  const ticketRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Create a unique ticket ID
  const ticketId =
    user?.id + Date.now().toLocaleString() + Math.random() * 1000;
  const qrData = `TICKET:${ticketId}:EVENT:${event.event_id}:USER:${user?.id}`;

  const handleDownload = async () => {
    if (!ticketRef.current) {
      toast.error("Ticket is not available for download.");
      return;
    }

    try {
      setLoading(true);
      const scaleFactor = 3; // Increase scale for higher resolution
      const canvas = await html2canvas(ticketRef.current, {
        scale: scaleFactor,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("portrait", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const marginY = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", 0, marginY, imgWidth, imgHeight);
      pdf.save(`${user?.name || "Ticket"}_Socio_Techno_Crat.pdf`);

      toast.success("Ticket downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download the ticket.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    // Implement your sharing logic here.
    toast.success("Ticket sharing link copied to clipboard!");
  };

  return (
    <div className="relative flex min-w-full items-center justify-center">
      <button
        onClick={() => window.history.back()}
        type="button"
        className="absolute left-4 top-4 z-30 flex items-center gap-2 rounded-md bg-white p-2 transition-colors hover:bg-gray-100"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      {loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/20 backdrop-blur-md">
          <Loader className="animate-spin" size={40} />
        </div>
      )}

      <div className="relative mt-[5rem] w-auto md:mt-[4rem]">
        <div className="relative overflow-hidden rounded-lg border-[1px] border-neutral-200 bg-white">
          {/* Wrap the ticket content in a ref so it can be captured */}
          <div ref={ticketRef}>
            <div className="p-6">
              <div className="mb-4 text-center">
                <h2 className="text-xl font-bold">{event.event_title}</h2>
                <p className="text-sm text-gray-600">
                  #{ticketId.substring(0, 8)}
                </p>
              </div>
              <div className="mb-6 flex justify-center">
                <QRCodeCanvas value={qrData} size={200} level="H" />
              </div>
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600">
                  Scan this QR code at the venue
                </p>
                <p className="font-semibold">{user?.name}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 border-t border-dashed border-gray-300 bg-gray-50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="mr-3 h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-medium">{event.event_start_date}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Time</div>
                  <div className="font-medium">{event.event_start_date}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-3 h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-600">Venue</div>
                <div className="font-medium">{event.event_venue}</div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 bg-zinc-300 p-4 text-white">
            <Button
              type="button"
              variant="outline"
              className="w-1/2 border-white text-black hover:bg-white"
              onClick={handleDownload}
            >
              <Download className="mr-1 h-4 w-4" />
              Download
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-1/2 border-white text-black hover:bg-white"
              onClick={handleShare}
            >
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;
