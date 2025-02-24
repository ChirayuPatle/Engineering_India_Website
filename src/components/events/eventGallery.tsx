"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-24%20212233-DRGaYkRZIui3wNPhmRz6NSOM9tjtyu.png",
    alt: "Event venue",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Hackathon participants",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Workshop session",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Prize ceremony",
  },
];

export function EventGallery() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
