"use client";

import { motion } from "framer-motion";
import { Users, Eye, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const metrics = [
  {
    icon: Users,
    label: "Registered",
    value: "14,512",
  },
  {
    icon: Users,
    label: "Team Size",
    value: "3 Members",
  },
  {
    icon: Eye,
    label: "Impressions",
    value: "1,05,97,950",
  },
  {
    icon: Clock,
    label: "Registration Deadline",
    value: "3 hours left",
  },
];

export default function EventMetrics() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="bg-muted p-2 rounded-full">
              <metric.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="font-medium">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
