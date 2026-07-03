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
  "Rohit Pradhan",
  "Sharvari Itankar",
  "Siddhi Ballal",
  "Palak Madhav Lanjewar",
  "Samruddhi Vywahare",
  "Sakshi Khante",
];

export default function JanBatchResultsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0F1B40] px-0 pb-16">
      {/* Cloudly Pinkish Header */}
      <section className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#0F1B40] px-4 pb-20 pt-40 text-center text-white">
        <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full">
          <FloatingCloud
            top="20%"
            left="5%"
            speed={0.5}
            cloudNum={1}
            opacity="opacity-30"
          />
          <FloatingCloud
            top="40%"
            left="80%"
            speed={0.8}
            cloudNum={2}
            opacity="opacity-20"
            scale={0.8}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-2xl">
          <h1 className="font-fraunces mb-6 text-4xl font-bold md:text-7xl">
            January Batch{" "}
            <span className="text-[#D4EBFF]">Recruitment Results</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl font-sans text-lg font-medium text-white/70">
            Congratulations to all selected students!
          </p>
        </div>
      </section>
      {/* Results Grid */}
      <div className="mx-auto w-full max-w-4xl px-4 text-center">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {janBatchResults.map((name, idx) => (
            <div
              key={name}
              className="group flex min-h-[90px] w-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-[#223366]/80 to-[#0F1B40]/90 px-6 py-8 shadow-xl transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="mb-2 block font-mono text-xs tracking-widest text-[#D4EBFF] opacity-80 group-hover:opacity-100">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span
                className="font-fraunces block break-words text-center text-base font-medium leading-snug text-white transition-colors duration-300 group-hover:text-[#D4EBFF] md:text-lg"
                style={{ wordBreak: "break-word" }}
              >
                {(() => {
                  const words = name.toLowerCase().split(" ");
                  if (words.length === 1) {
                    return words[0]
                      ? words[0].charAt(0).toUpperCase() + words[0].slice(1)
                      : "";
                  }
                  return (
                    (words[0]
                      ? words[0].charAt(0).toUpperCase() + words[0].slice(1)
                      : "") +
                    " " +
                    words.slice(1, -1).join(" ") +
                    (words.length > 2 ? " " : "") +
                    (words.length > 1 && words[words.length - 1]
                      ? (words[words.length - 1] ?? "")
                          .charAt(0)
                          .toUpperCase() +
                        (words[words.length - 1] ?? "").slice(1)
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
