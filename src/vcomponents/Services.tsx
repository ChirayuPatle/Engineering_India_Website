"use client";

import { motion } from "framer-motion";
import { Code, Paintbrush, Megaphone, Smartphone } from "lucide-react";

const services = [
  {
    icon: <Paintbrush className="mb-4 h-12 w-12 text-blue-500" />,
    title: "UI/UX Design",
    description:
      "Crafting intuitive and visually stunning interfaces that engage and delight users.",
  },
  {
    icon: <Code className="mb-4 h-12 w-12 text-green-500" />,
    title: "Web Development",
    description:
      "Building robust, scalable, and high-performance websites and web applications.",
  },
  {
    icon: <Megaphone className="mb-4 h-12 w-12 text-yellow-500" />,
    title: "Digital Marketing",
    description:
      "Developing strategic campaigns that increase brand visibility and drive conversions.",
  },
  {
    icon: <Smartphone className="mb-4 h-12 w-12 text-purple-500" />,
    title: "Mobile App Development",
    description:
      "Creating innovative mobile applications for iOS and Android platforms.",
  },
];

export default function Services() {
  return (
    <section className="bg-gray-800 px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.h2
          className="mb-16 text-center text-5xl font-black text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="rounded-lg bg-gray-700 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {service.icon}
              <h3 className="mb-2 text-xl font-bold text-white">
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
