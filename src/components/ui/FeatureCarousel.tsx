"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { title } from "process";

const features = [
  {
    title: "Minimal Design",
    description: "Clean aesthetics that put your content in the spotlight.",
    icon: "✨",
  },
  {
    title: "Responsive",
    description: "Flawless experiences across all devices and screen sizes.",
    icon: "📱",
  },
  {
    title: "Fast Performance",
    description: "Lightning-quick load times for smooth user interactions.",
    icon: "⚡",
  },
  {
    title: "Accessibility",
    description: "Inclusive design practices for all users.",
    icon: "🌈",
  },
  {
    title: "SEO Optimized",
    description: "Built to help your site rank higher in search results.",
    icon: "🔍",
  },
];

export default function FeatureCarousel() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX > 0) {
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    } else if (currentX < -width) {
      controls.start({
        x: -width,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-background to-secondary/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
          Our Team
        </h2>
        <motion.div ref={carousel} className="cursor-grab overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            animate={controls}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="flex"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="hover-lift m-4 flex h-[400px] min-w-[300px] flex-col items-center justify-center rounded-3xl border-2 border-transparent bg-background p-8 shadow-lg transition-all duration-300 ease-in-out hover:border-primary/10"
              >
                <div>
                  <div className="h-72 w-60 rounded-xl border-2">
                    {" "}
                    <img
                      className="h-full w-full object-cover"
                      src="https://res.cloudinary.com/priyanshukayarkar/image/upload/v1739172993/WhatsApp_Image_2025-02-10_at_1.03.59_PM_q4jfu2.jpg"
                      alt=""
                    />{" "}
                  </div>
                  <h1>{} </h1>
                  <h1>College Cordinator</h1>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
