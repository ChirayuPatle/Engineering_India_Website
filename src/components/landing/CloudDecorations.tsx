"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";

interface CloudConfig {
  id: number;
  src: string;
  top: string;
  left: string;
  width: string;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
  flipX: boolean;
  zIndex: number;
}

interface CloudDecorationsProps {
  density?: "low" | "medium" | "high";
  className?: string;
}

// Seeded random function for consistent but random-looking positions
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function CloudDecorations({
  density = "medium",
  className = "",
}: CloudDecorationsProps) {
  const cloudImages = [
    "/landing/clouds/1.png",
    "/landing/clouds/2.png",
    "/landing/clouds/3.png",
    "/landing/clouds/4.png",
  ];

  const clouds = useMemo(() => {
    const cloudCount = density === "low" ? 4 : density === "medium" ? 6 : 9;
    const generatedClouds: CloudConfig[] = [];

    // Define position zones to avoid clustering
    const zones = [
      // Top left area
      { topMin: 5, topMax: 20, leftMin: -15, leftMax: 15 },
      // Top right area
      { topMin: 5, topMax: 20, leftMin: 75, leftMax: 105 },
      // Middle left area
      { topMin: 30, topMax: 50, leftMin: -20, leftMax: 10 },
      // Middle right area
      { topMin: 30, topMax: 50, leftMin: 80, leftMax: 110 },
      // Bottom left area
      { topMin: 60, topMax: 80, leftMin: -15, leftMax: 20 },
      // Bottom right area
      { topMin: 60, topMax: 80, leftMin: 70, leftMax: 105 },
      // Top center (subtle)
      { topMin: 10, topMax: 25, leftMin: 35, leftMax: 65 },
      // Middle center (very subtle)
      { topMin: 40, topMax: 55, leftMin: 30, leftMax: 70 },
      // Bottom center
      { topMin: 70, topMax: 85, leftMin: 35, leftMax: 65 },
    ];

    for (let i = 0; i < cloudCount; i++) {
      const zone = zones[i % zones.length]!;
      const seed = i * 123.456;

      // Calculate position within the zone
      const topValue =
        zone.topMin + seededRandom(seed) * (zone.topMax - zone.topMin);
      const leftValue =
        zone.leftMin + seededRandom(seed + 1) * (zone.leftMax - zone.leftMin);

      // Varied sizes for depth
      const sizeOptions = ["120px", "160px", "200px", "240px", "180px"];
      const width =
        sizeOptions[Math.floor(seededRandom(seed + 2) * sizeOptions.length)] ??
        "160px";

      // Opacity varies for depth effect
      const opacity = 0.15 + seededRandom(seed + 3) * 0.25;

      generatedClouds.push({
        id: i,
        src:
          cloudImages[
            Math.floor(seededRandom(seed + 4) * cloudImages.length)
          ] ?? cloudImages[0]!,
        top: `${topValue}%`,
        left: `${leftValue}%`,
        width,
        opacity,
        animationDelay: seededRandom(seed + 5) * 5,
        animationDuration: 15 + seededRandom(seed + 6) * 20,
        flipX: seededRandom(seed + 7) > 0.5,
        zIndex: Math.floor(seededRandom(seed + 8) * 3) + 1,
      });
    }

    return generatedClouds;
  }, [density, cloudImages]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            opacity: cloud.opacity,
            zIndex: cloud.zIndex,
            transform: cloud.flipX ? "scaleX(-1)" : "none",
          }}
          animate={{
            x: [0, 15, 0, -10, 0],
            y: [0, -8, 0, 5, 0],
          }}
          transition={{
            duration: cloud.animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cloud.animationDelay,
          }}
        >
          <img
            src={cloud.src}
            alt=""
            className="h-auto w-full select-none"
            draggable="false"
            loading="lazy"
            style={{
              filter: "blur(0.5px)",
              willChange: "transform",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
