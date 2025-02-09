"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Share } from "../share";

export function ShareStep() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto"
      >
        <Check className="w-8 h-8" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Registration Complete!</h2>
        <p className="text-muted-foreground">
          Thank you for registering. Share your registration with others:
        </p>
      </div>

      <div className="flex justify-center">
        <Share
          url="https://example.com/event"
          title="I just registered for this amazing event!"
        />
      </div>
    </motion.div>
  );
}
