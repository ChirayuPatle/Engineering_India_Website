"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventRegistration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold">Free</span>
        </div>

        <Button
          className="w-full bg-neutral-800 hover:bg-neutral-700 text-white"
          size="lg"
        >
          {/* <div className="flex flex-col items-center">
            <span>Incomplete Registration</span>
            <span className="text-xs opacity-90">(Consent needed)</span>
          </div> */}
          Register
        </Button>
      </Card>
    </motion.div>
  );
}
