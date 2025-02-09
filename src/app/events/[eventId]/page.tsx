"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RegisterButton } from "@/features/event/component/registrationButton";
import { Share } from "@/features/event/component/share";
import EventTimeline, {
  TimelineEvent,
} from "@/features/event/component/eventTimelime";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// Dummy event data (in real app, fetch from API)
const event = {
  id: "1",
  title: "Tech Conference 2024 🚀",
  description:
    "Join us for an amazing tech conference featuring industry experts, hands-on workshops, and innovative discussions. Expect networking, expert panels, and a lot of fun!",
  date: "2024-04-15",
  time: "09:00 AM - 05:00 PM",
  location: "Tech Convention Center, Silicon Valley",
  price: "$99",
  category: "Technical",
  isFree: false,
  images: [
    "https://images.unsplash.com/photo-1738975927070-d5af82de67c1?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=600&auto=format&fit=crop&q=60",
  ],
  features: [
    "Expert Speakers 🎤",
    "Networking Opportunities 🤝",
    "Hands-on Workshops 🛠️",
    "Certificate of Participation 🎓",
  ],
};

// Dummy timeline data
const dummyTimeline: TimelineEvent[] = [
  { day: 1, time: "09:00 AM", title: "Opening Ceremony" },
  { day: 1, time: "10:00 AM", title: "Keynote Speech" },
  { day: 1, time: "11:30 AM", title: "Networking Break" },
  { day: 2, time: "08:30 AM", title: "Workshop: React Best Practices" },
  { day: 2, time: "10:00 AM", title: "Panel Discussion" },
  { day: 3, time: "09:30 AM", title: "Closing Ceremony" },
];

export default function EventPage() {
  const router = useRouter();
  const pathname = usePathname();
  const handleRegister = () => {
    // Registration logic here
    router.push(`${pathname}/register`);
    console.log("Register clicked");
  };

  return (
    <div className="min-h-screen bg-background mt-[6rem] px-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 space-y-12"
      >
        {/* Header Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex gap-2">
                <Badge>{event.category}</Badge>
                {event.isFree && <Badge variant="secondary">Free</Badge>}
              </div>
              <h1 className="text-5xl font-bold">{event.title}</h1>
            </div>
            <div className="mt-2">
              <RegisterButton onClick={handleRegister} />
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-3xl"
          >
            {event.description}
          </motion.p>
        </div>

        {/* Event Details Section */}
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 h-full space-y-4">
              <h2 className="text-2xl font-semibold">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Features ✨</h2>
              <ul className="space-y-2">
                {event.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {event.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Event image ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Images Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {event.images.map((image, index) => (
            <motion.div
              key={`more-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.4 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Additional image ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Event Timeline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 bg-background min-h-screen"
        >
          <h1 className="text-3xl font-bold mb-6">Event Timeline 📅</h1>
          <EventTimeline timeline={dummyTimeline} />
        </motion.div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="w-full h-96 mt-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Location on Map 🗺️</h2>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
              event.location
            )}`}
          ></iframe>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4 pt-8"
        >
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            <span>Share this event</span>
          </div>
          <Share
            url={`https://example.com/events/${event.id}`}
            title={event.title}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
