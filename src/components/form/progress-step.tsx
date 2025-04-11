"use client";
import { Check } from "lucide-react";

interface ProgressStepsProps {
  steps: string[];
  activeStep: number;
  className?: string;
}

export function ProgressSteps({
  steps,
  activeStep,
  className,
}: ProgressStepsProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                index < activeStep
                  ? "bg-neutral-600 text-white"
                  : index === activeStep
                    ? "bg-black text-white"
                    : "bg-neutral-200 text-gray-500"
              }`}
            >
              {index < activeStep ? <Check className="h-5 w-5" /> : index + 1}
            </div>
            <span className="mt-2 text-sm">{step}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute left-0 top-0 h-1 w-full rounded bg-gray-200">
          <div
            className="h-full rounded bg-black transition-all duration-300"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
