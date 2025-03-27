"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

const timelineEvents = [
  {
    year: "2022 | August 23",
    title: "Establishment of Engineering India, YCCE & Uttishtha Bharat",
    description:
      "Founded to promote technical and social engagement, Engineering India, YCCE hosted its first event, Uttishtha Bharat, celebrating 75 years of independence with inspiring speeches and a Tiranga Rally.",
  },
  {
    year: "2023 | May 8-10",
    title: "Avyanna – Self-Defence Workshop",
    description:
      "A three-day workshop on Yeshti techniques and Prahar training empowered 60 participants with essential self-defense skills and awareness.",
  },
  {
    year: "2024 | January 3",
    title: "New Year Donation Drive",
    description:
      "Volunteers distributed food, clothing, and toys, spreading joy and fostering compassion in the community.",
  },
  {
    year: "2024 | March 2",
    title: "Shivaji Maharaj Jayanti Celebration",
    description:
      "Held at SDM Auditorium, this event featured Shivgoshna, Godhal dance, and an inspiring speech by Ram Wagh Sir, honoring Shivaji Maharaj’s legacy and fostering pride.",
  },
  {
    year: "2024 | April 27",
    title: "वाक् यज्ञः – Speech Competition",
    description:
      "An intercollegiate event where 27 participants showcased their ideas. Winners were awarded certificates and cash prizes, promoting teamwork and a competitive spirit.",
  },
  {
    year: "2024 | August 10",
    title: "Rangeet Talim 4.0",
    description:
      "Held at Omkar Nagar, Nagpur, this social initiative engaged slum children in education and cultural activities. With 70 volunteers, it fostered learning and community spirit.",
  },
  {
    year: "2025 | February 10",
    title: "Ultimate Socio-Technocrat – Social Hackathon",
    description:
      "As part of YASH 25.0, this offline hackathon at YCCE saw 75+ participants tackle real-world issues in Slum Development, Women Empowerment, and Carbon Footprint. Collaborating with NGOs, participants presented innovative solutions, with judges selecting the best.",
  },
];

const FlowerIcon = ({ progress }: { progress: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    style={{ transform: `scale(${progress})` }}
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 8C12 8 14 10 14 12C14 14 12 16 12 16C12 16 10 14 10 12C10 10 12 8 12 8Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="md-mt-0 -mt-10 overflow-hidden bg-background py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Our Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The evolution of Flowers & Saints through the years
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 transform bg-primary/20"
            style={{ scaleY: scaleX }}
          />

          {/* Flower icon */}
          <motion.div
            className="sticky left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-primary"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          ></motion.div>

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() =>
                setExpandedEvent(expandedEvent === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={`mb-8 flex w-full items-center justify-between ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <div className="h-3 w-3 rounded-full bg-background" />
        </div>
      </div>
      <motion.div
        className="w-5/12 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className="rounded-lg border border-primary/10 bg-background p-4 shadow-md">
          <span className="font-bold text-primary">{event.year}</span>
          <h3 className="mb-1 text-lg font-semibold">{event.title}</h3>
          <p className="hidden md:flex text-muted-foreground">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          ></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
