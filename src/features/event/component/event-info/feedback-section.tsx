"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Write a feedback</h3>
        <Textarea
          placeholder="Share your experience..."
          className="min-h-[100px]"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant="ghost"
              size="sm"
              className="p-0 hover:bg-transparent"
            >
              <Star className="w-6 h-6 text-muted-foreground hover:text-yellow-400 transition-colors" />
            </Button>
          ))}
        </div>
        <Button>Submit Review</Button>
      </div>
    </motion.div>
  );
}
