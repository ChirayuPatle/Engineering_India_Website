"use client";
import { EventCard, EventsProps } from "@/features/event/component/eventCard";
import {
  Abhudaya,
  Chitrankan,
  DonationDrive,
  HeadsDetails,
  Rangittalim3,
  Rangittalim4,
  ShivajiJayanti,
} from "@/constant/events";
import { motion } from "framer-motion";

// The imported constants are arrays of event objects (each with properties: imgUrl, id, name, details).
// We'll map them to the expected EventsProps format.
const eventGroups = [
  Abhudaya,
  Chitrankan,
  DonationDrive,
  Rangittalim3,
  Rangittalim4,
  ShivajiJayanti,
];

function mapEvent(
  e: { id: number; name: string; details: string; imgUrl: string[] }
): EventsProps {
  return {
    id: e.id.toString(), // Convert number to string
    title: e.name,       // Use 'name' as title
    imgUrl: e.imgUrl,
    isOnline: true,
    isFree: true,
    registeredCount: 0,
    daysLeft: 0,
    isAward: false,
    nominateEnabled: false,
    voteEnabled: false,
  };
}

// Flatten all event groups into a single array.
const allEvents: EventsProps[] = eventGroups.flat().map(mapEvent);

const Page = () => {
  return (
    <main className="w-full min-h-screen pt-[6rem]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Explore Our Events
        </h1>
      </motion.div>
      {/* Render all events in one grid */}
      <EventCard events={allEvents} />
    </main>
  );
};

export default Page;
