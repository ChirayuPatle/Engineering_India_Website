"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Minimalist Brand Identity",
    description: "Clean and modern visual communication for a tech startup",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Branding",
  },
  {
    id: 2,
    title: "Sleek Web Experience",
    description: "Elegant online presence for a luxury fashion brand",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Web Design",
  },
  {
    id: 3,
    title: "Intuitive Mobile App",
    description: "User-friendly app design for a health and wellness company",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Mobile App",
  },
  {
    id: 4,
    title: "Elegant Digital Campaign",
    description:
      "Sophisticated marketing strategy for a luxury automotive brand",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Digital Marketing",
  },
  {
    id: 5,
    title: "Refined UI/UX Design",
    description:
      "Streamlined user interfaces for a financial services platform",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "UI/UX",
  },
  {
    id: 6,
    title: "Minimalist Product Design",
    description: "Sleek and functional design for a smart home device",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Product Design",
  },
];

const categories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Our Work
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A showcase of our minimalist designs and creative solutions.
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="hover-lift overflow-hidden rounded-3xl border-2 border-transparent bg-background shadow-lg transition-all duration-300 ease-in-out hover:border-primary/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="px-4 text-center text-white">
                      {project.description}
                    </p>
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="mb-1 text-sm font-medium text-primary">
                    {project.category}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <a
                    href="https://www.flowersandsaints.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    View Project
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
