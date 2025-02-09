"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function TimelineSection() {
  const stages = [
    {
      date: "10",
      month: "Feb 25",
      title: "Aptitude Assessment",
      description:
        "Teams will have to take an online MCQ assessment based on Aptitude questions. Participants will have to answer 30 questions in 30 minutes. It is mandatory for all team members to attempt the assessment. This will be an elimination round.",
      startTime: "12:00 PM IST",
      endTime: "08:00 PM IST",
    },
    {
      date: "12",
      month: "Feb 25",
      title: "Case Launch & Submission",
      description:
        "Shortlisted participants will be required to submit a 2-3 minute video pitch, a PPT with up to 7-8 slides, and a working prototype (optional) on any 1 problem statement of your choice. Annexures, if desired, can be added in addition to these slides.",
      startTime: "12:00 PM IST",
      endTime: "11:59 PM IST",
    },
    {
      date: "15",
      month: "Feb 25",
      title: "Grand Finale",
      description:
        "Top 6 teams would be shortlisted for the Grand Finale. National Finalist teams will get the opportunity to present their ideas to the Senior Leadership of L&T.",
      startTime: "To be announced",
      endTime: "To be announced",
    },
  ];

  return (
    <section id="timeline" className="scroll-mt-20 px-6 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <motion.h2 variants={item} className="text-3xl font-bold">
          Stages and Timelines
        </motion.h2>

        <div className="relative space-y-10 before:absolute before:left-[25px] before:top-2 before:h-[calc(100%-48px)] before:w-[2px] before:bg-gray-300">
          {stages.map((stage, index) => (
            <motion.div key={index} variants={item} className="relative pl-16">
              <div className="absolute left-0 flex flex-col items-center">
                <div className="bg-neutral-800 text-white rounded-lg p-2 text-center w-[60px] shadow-lg">
                  <div className="text-2xl font-bold">{stage.date}</div>
                  <div className="text-xs">{stage.month}</div>
                </div>
              </div>

              <Card className="p-6 bg-white shadow-md border border-gray-200 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {stage.title}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {stage.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <div>Start: {stage.startTime}</div>
                    <div>End: {stage.endTime}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
