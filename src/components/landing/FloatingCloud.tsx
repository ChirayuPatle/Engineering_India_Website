"use client";

import { motion } from "motion/react";

interface FloatingCloudProps {
  speed?: number;
  top: string;
  left: string;
  width?: string;
  opacity?: string;
  delay?: number;
  scale?: number;
  cloudNum?: number;
}

export const FloatingCloud = ({
  speed = 1,
  top,
  left,
  width = "w-64",
  opacity = "opacity-20",
  delay = 0,
  scale = 1,
  cloudNum = 1,
}: FloatingCloudProps) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      viewport={{ once: false }}
      style={{ top, left, scale }}
      className={`pointer-events-none absolute z-0 select-none ${width} ${opacity}`}
    >
      <motion.img
        animate={{
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5 / speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        src={`/landing/clouds/${cloudNum}.png`}
        className="h-auto w-full"
        alt=""
      />
    </motion.div>
  );
};
