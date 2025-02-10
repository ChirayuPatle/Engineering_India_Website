"use client";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";

interface CardProps {
  imageUrl?: string;
  name: string;
  post: string;
}

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

const contentVariants = {
  rest: { y: 20, opacity: 0 },
  hover: { y: 0, opacity: 1 },
};

export default function HeadsCard({ imageUrl, name, post }: CardProps) {
  return (
    <motion.div
      className="max-w-xs w-full relative cursor-pointer overflow-hidden rounded-md shadow-xl"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Background Image */}
      <motion.img
        src={imageUrl}
        alt={name}
        className="w-full h-72 md:h-80 object-cover"
        variants={imageVariants}
        transition={{ duration: 0.5 }}
      />

      {/* Overlay with animated text */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4"
        variants={overlayVariants}
        transition={{ duration: 0.3 }}
      >
        <motion.h3
          className="text-white text-xl md:text-2xl font-bold"
          variants={contentVariants}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {name}
        </motion.h3>
        <motion.p
          className="text-white text-sm md:text-base mt-2"
          variants={contentVariants}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {post}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
 