"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/event-api";
import { ProgressSteps } from "@/components/form/progress-step";
import { GeneralInfoForm } from "@/components/form/general-info";
import { EventDetailsForm } from "@/components/form/event-details";
import { RegistrationFormBuilder } from "@/components/form/registration-form-builder";
import { EventPreview } from "@/components/form/event-preview";
import {
  type CompleteFormData,
  type GeneralFormData,
  type EventDetailsFormData,
  type RegistrationFormData,
} from "@/types/event";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const formSteps = ["Basic Info", "Event Details", "Registration", "Review"];

export default function EventCreatePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeStep, setActiveStep] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  const form = useForm<CompleteFormData>({
    defaultValues: {
      name: "",
      description: "",
      venue: "",
      mode: "Offline",
      startDate: "",
      endDate: "",
      regStartDate: "",
      regEndDate: "",
      maxCapacity: 100,
      organizerContact: "",
      whatsappLink: "",
      prizes: [{ name: "1st Prize", value: "₹10,000" }],
      timeline: [{ time: "10:00 AM", activity: "Registration" }],
      rules: "",
      faqs: [],
      fields: [
        { name: "Full Name", type: "text", required: true },
        { name: "Email", type: "email", required: true },
      ],
      upiIds: [],
      conclusionContent:
        "Thank you for registering! We'll see you at the event.",
    },
  });

  const eventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created successfully");
      router.push("/admin/events");
    },
    onError: (error) => {
      toast.error("Failed to create event");
      console.error(error);
    },
  });

  const handleSubmit = async () => {
    const values = form.getValues();
    console.log("Form data before submission:", values); // Log form data

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "bannerImage" || key === "qrCodeImage") {
        if (value instanceof FileList && value[0]) {
          formData.append(key, value[0]);
        }
      } else if (value !== undefined && value !== null) {
        formData.append(key, JSON.stringify(value));
      }
    });

    formData.append("isPaid", isPaid.toString());
    await eventMutation.mutateAsync(formData);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const valid = await form.trigger([
        "name",
        "description",
        "venue",
        "mode",
        "startDate",
        "endDate",
        "regStartDate",
        "regEndDate",
        "maxCapacity",
        "bannerImage",
        "organizerContact",
      ]);
      if (valid) setActiveStep((prev) => prev + 1);
    } else if (activeStep === 1) {
      // Validate timeline and prizes
      const timelineValid = await form.trigger("timeline");
      const prizesValid = await form.trigger("prizes");
      if (timelineValid && prizesValid) {
        setActiveStep((prev) => prev + 1);
      }
    } else if (activeStep === 2) {
      const valid = await form.trigger(["fields"]);
      if (valid) setActiveStep((prev) => prev + 1);
    } else if (activeStep === 3) {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="container">
      <div className="flex items-center pb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Create New Event
        </h1>
      </div>

      <div className="mx-auto max-w-3xl px-2 sm:max-w-5xl">
        <ProgressSteps steps={formSteps} activeStep={activeStep} />

        <FormProvider {...form}>
          {activeStep === 0 && (
            <GeneralInfoForm
              form={
                form as unknown as ReturnType<typeof useForm<GeneralFormData>>
              }
              isPaid={isPaid}
              setIsPaid={setIsPaid}
              onSubmit={handleNext}
              isSubmitting={eventMutation.isPending}
            />
          )}

          {activeStep === 1 && (
            <EventDetailsForm
              form={
                form as unknown as ReturnType<
                  typeof useForm<EventDetailsFormData>
                >
              }
              onSubmit={handleNext}
              onBack={handleBack}
              isSubmitting={eventMutation.isPending}
            />
          )}

          {activeStep === 2 && (
            <RegistrationFormBuilder
              form={
                form as unknown as ReturnType<
                  typeof useForm<RegistrationFormData>
                >
              }
              isPaid={isPaid}
              onSubmit={handleNext}
              onBack={handleBack}
              isSubmitting={eventMutation.isPending}
            />
          )}

          {activeStep === 3 && (
            <EventPreview
              eventData={form.watch()}
              isPaid={isPaid}
              onSubmit={handleNext}
              onBack={handleBack}
              isSubmitting={eventMutation.isPending}
            />
          )}
        </FormProvider>
      </div>
    </div>
  );
}
