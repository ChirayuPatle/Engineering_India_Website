"use client";

import React from "react";
import { FloatingCloud } from "@/components/landing/FloatingCloud";

const janBatchResults = [
  "Sourabh Masnewar",
  "Sejal Raut",
  "Gayatri V. Ekre",
  "Linal patle",
  "Pooja Ingle",
  "HARSH KUMAR SHARMA",
  "Jayshree Narayan Gore",
  "Dipika Shahare",
  "GAURAVI GULAB CHAVAN",
  "Sumit Atilkar",
  "Dhanwantari Bidkar",
  "Rishikasingh U Rathod",
  "Samiksha Jawanjal",
  "Ayush Mahajan",
  "Vaibhavi Katpatal",
  "Aditi Vijay Likhar",
  "Janhavi Nakade",
  "Shivshankar Shinde",
  "Harshal Raju Hatwar",
  "Sanchita Shrivas",
  "Sharayu Burnase",
  "Jayshree Sawalkar",
  "Himanshu Kirpal",
  "Siddhi pokale",
  "Kartik Tajne",
  "Rohit Pradhan"
];

export default function JanBatchResultsPage() {
  return (
    <main className="min-h-screen bg-[#0F1B40] flex flex-col items-center justify-center px-0 pb-16">
      {/* Cloudly Pinkish Header */}
      <section className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#0F1B40] px-4 pb-20 pt-40 text-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <FloatingCloud top="20%" left="5%" speed={0.5} cloudNum={1} opacity="opacity-30" />
          <FloatingCloud top="40%" left="80%" speed={0.8} cloudNum={2} opacity="opacity-20" scale={0.8} />
        </div>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <h1 className="font-fraunces mb-6 text-4xl font-bold md:text-7xl">January Batch <span className="text-[#D4EBFF]">Recruitment Results</span></h1>
          <p className="mx-auto max-w-xl font-sans text-white/70 mb-10 text-lg font-medium">Congratulations to all selected students!</p>
        </div>
      </section>
      {/* Results Grid */}
      <div className="w-full max-w-4xl mx-auto text-center px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {janBatchResults.map((name, idx) => (
            <div
              key={name}
              className="w-full rounded-3xl bg-gradient-to-br from-[#223366]/80 to-[#0F1B40]/90 border border-white/10 px-6 py-8 shadow-xl flex flex-col items-center justify-center min-h-[90px] transition-transform duration-300 hover:scale-[1.03] group"
            >
              <span className="block text-xs text-[#D4EBFF] font-mono mb-2 opacity-80 group-hover:opacity-100 tracking-widest">{String(idx + 1).padStart(2, '0')}</span>
              <span className="block text-base md:text-lg font-medium text-white text-center break-words leading-snug font-fraunces group-hover:text-[#D4EBFF] transition-colors duration-300" style={{wordBreak: 'break-word'}}>
                {(() => {
                  const words = name.toLowerCase().split(" ");
                  if (words.length === 1) {
                    return words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1) : "";
                  }
                  return (
                    (words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1) : "") +
                    " " +
                    words.slice(1, -1).join(" ") +
                    (words.length > 2 ? " " : "") +
                    (words.length > 1 && words[words.length - 1]
                      ? (words[words.length - 1] ?? "").charAt(0).toUpperCase() + (words[words.length - 1] ?? "").slice(1)
                      : "")
                  ).replace(/  +/g, " ");
                })()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}