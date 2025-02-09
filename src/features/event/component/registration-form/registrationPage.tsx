"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserStep } from "./userStep";
import { EventStep } from "./eventStep";
import { DetailsStep } from "./detailStep";
import { ShareStep } from "./shareStep";
import { registrationSchema } from "./schema";
import type { RegistrationData } from "./types";

// Define the steps for the registration process.
const steps = [
  { id: 1, name: "User Information" },
  { id: 2, name: "Event Details" },
  { id: 3, name: "Additional Info" },
  { id: 4, name: "Share" },
];

export function RegistrationForm() {
  const [step, setStep] = React.useState(1);
  const methods = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegistrationData) => {
    if (step < steps.length) {
      setStep(step + 1);
      return;
    }
    // Handle final form submission (e.g., send data to your API)
    console.log("Final submission data:", data);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center text-black ">
          {steps.map((s) => (
            <div key={s.id} className="flex items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                    step >= s.id ? "var(--primary)" : "var(--muted)",
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
              >
                <span
                  className={
                    step >= s.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {s.id}
                </span>
              </motion.div>
              {s.id !== steps.length && (
                <div className="w-20 h-1 mx-2 bg-muted">
                  <motion.div
                    initial={false}
                    animate={{
                      width: step > s.id ? "100%" : "0%",
                    }}
                    className="h-full bg-primary"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && <UserStep />}
              {step === 2 && <EventStep />}
              {step === 3 && <DetailsStep />}
              {step === 4 && <ShareStep />}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Previous
            </Button>
            <Button onClick={() => setStep((prev) => prev + 1)} type="submit">
              {step === steps.length ? "Complete" : "Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
}

export default RegistrationForm;
