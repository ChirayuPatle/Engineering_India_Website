"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { type Event } from "@/context/eventContext";

interface EventGalleryProps {
  event: Event;
}

const EventGallery = ({ event }: EventGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!event.gallery || event.gallery.length === 0) {
    return null;
  }

  return (
    <section className="animate-slide-up">
      <h2 className="section-title">Gallery</h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {event.gallery.map((image, index) => (
          <div
            key={index}
            className="card-hover cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(image)}
          >
            <AspectRatio ratio={1}>
              <img
                src={image}
                alt={`Event gallery ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-2 top-2 z-50 rounded-full bg-black/50 p-2 text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={selectedImage || ""}
            alt="Gallery image"
            className="h-auto max-h-[80vh] w-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventGallery;
