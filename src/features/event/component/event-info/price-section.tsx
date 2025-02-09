"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PrizeSection() {
  const prizes = [
    {
      position: "Winners",
      amount: "₹1,00,000",
      benefits: ["Pre-Placement Interview"],
      icon: "💰",
    },
    {
      position: "1st Runners-Up",
      amount: "₹75,000",
      benefits: ["Pre-Placement Interview"],
      icon: "🥈",
    },
    {
      position: "2nd Runners-Up",
      amount: "₹50,000",
      benefits: ["Pre-Placement Interview"],
      icon: "🥉",
    },
    {
      position: "National Finalists",
      amount: "",
      benefits: [
        "Certificate of Participation",
        "Pre-Placement Interview Opportunity",
      ],
      icon: "🏆",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <Badge className="bg-green-100 text-green-800 mb-6">
          <Trophy className="w-4 h-4 mr-2" />
          Grab Pre-Placement Interviews
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prizes.map((prize, index) => (
          <motion.div key={index} variants={item}>
            <Card className="p-6 h-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {prize.position}
                  </h3>
                  {prize.amount && (
                    <div className="text-3xl font-bold text-primary mb-4">
                      {prize.amount}
                    </div>
                  )}
                  <div className="space-y-2">
                    {prize.benefits.map((benefit, i) => (
                      <Badge key={i} variant="secondary">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                <span className="text-4xl">{prize.icon}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
