"use client"

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
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {event.gallery.map((image, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg cursor-pointer card-hover"
            onClick={() => setSelectedImage(image)}
          >
            <AspectRatio ratio={1}>
              <img 
                src={image} 
                alt={`Event gallery ${index + 1}`} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0 shadow-none">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 z-50 p-2 bg-black/50 text-white rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
          <img 
            src={selectedImage || ''} 
            alt="Gallery image" 
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventGallery;
