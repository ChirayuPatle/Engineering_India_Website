"use client";

import DynamicFrameLayout from "@/features/landing/components/image-slider/DynamicFramer";
import { useState } from "react";
export default function ImageSlider() {
  const [headerSize] = useState(1.2); // 120% is the default size
  const [textSize] = useState(0.8); // 80% is the default size

  return (
    <div
      className={` bg-white/90 flex flex-col items-center justify-start p-8 `}
    >
      <h1 className=" my-3 md:my-16 text-black/80 text-2xl md:text-7xl font-semibold  ">
        Our Events
      </h1>
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
          <DynamicFrameLayout />
        </div>
      </div>
    </div>
  );
}
