"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReferAndWin() {
  return (
    <Card className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="font-semibold">Refer & Win</h3>
        <p className="text-sm text-muted-foreground">
          MacBook, iPhone, Apple Watch, Cash and more!
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Refer now
          </Button>
          <Button variant="outline" size="sm">
            Know more
          </Button>
        </div>
      </motion.div>
    </Card>
  );
}
