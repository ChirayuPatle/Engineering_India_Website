"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

import EventTimeline from "./eventTimelime";
import { formatDate } from "@/libs/formatDate";

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("./maps"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-muted animate-pulse rounded-lg" />
  ),
});

// Example event data (in real app, this would come from an API/database)
const event = {
  id: 1,
  title: "TechConf 2024",
  description:
    "Join us for the biggest tech conference of the year! We'll be covering the latest trends in AI, Web Development, and Cloud Computing. Network with industry leaders and participate in hands-on workshops.",
  category: "Technical",
  isFree: true,
  date: "2024-04-15T09:00:00",
  endDate: "2024-04-17T18:00:00",
  deadline: "2024-04-01T23:59:59",
  location: {
    name: "Tech Convention Center",
    address: "123 Innovation Street, Silicon Valley, CA",
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=500&width=700",
    "/placeholder.svg?height=450&width=650",
  ],
  timeline: [
    { time: "09:00", day: 1, title: "Registration & Breakfast" },
    { time: "10:00", day: 1, title: "Keynote Speech" },
    { time: "12:00", day: 1, title: "Lunch Break" },
    { time: "14:00", day: 1, title: "Workshop Sessions" },
    { time: "09:30", day: 2, title: "Panel Discussion" },
    { time: "11:30", day: 2, title: "Networking Session" },
    { time: "10:00", day: 3, title: "Closing Ceremony" },
  ],
};

export default function EventPage() {
  const isUpcoming = new Date(event.date) > new Date();

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 py-8 mx-auto space-y-8"
      >
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold"
            >
              {event.title}
            </motion.h1>
            <div className="flex gap-2">
              <Badge variant="secondary">{event.category}</Badge>
              {event.isFree && <Badge variant="default">Free</Badge>}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            {event.description}
          </motion.p>

          {isUpcoming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 text-red-500"
            >
              <Clock className="w-4 h-4" />
              <span>Registration deadline: {formatDate(event.deadline)}</span>
            </motion.div>
          )}
        </div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]"
        >
          {event.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`relative rounded-xl overflow-hidden ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Event image ${index + 1}`}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Date and Location */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Date & Time
              </h2>
              <div className="space-y-2">
                <p>Start: {formatDate(event.date)}</p>
                <p>End: {formatDate(event.endDate)}</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </h2>
              <div className="space-y-2">
                <p className="font-medium">{event.location.name}</p>
                <p className="text-muted-foreground">
                  {event.location.address}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold">Event Timeline</h2>
          <EventTimeline timeline={event.timeline} />
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold">Location Map</h2>
          <div className="h-[300px] rounded-lg overflow-hidden">
            <Map
              center={event.location.coordinates}
              name={event.location.name}
              address={event.location.address}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
