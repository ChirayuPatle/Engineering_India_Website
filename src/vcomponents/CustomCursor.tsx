"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
      animate={{ x: mousePosition.x - 5, y: mousePosition.y - 5 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <div className="h-3 w-3 rounded-full bg-white" />
    </motion.div>
  );
}
