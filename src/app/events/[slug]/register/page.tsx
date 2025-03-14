"use client";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import Router from "next/navigation";

// Define schemas for each step
const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

const academicInfoSchema = z.object({
  college: z.string().min(2, "College name is required"),
  department: z.string().min(2, "Department is required"),
  year: z.string().min(1, "Year is required"),
});

const confirmationSchema = z.object({
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type PersonalInfoInputs = z.infer<typeof personalInfoSchema>;
type AcademicInfoInputs = z.infer<typeof academicInfoSchema>;
type ConfirmationInputs = z.infer<typeof confirmationSchema>;

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle: string;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  eventId,
  eventTitle,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // Personal info form
  const personalInfoForm = useForm<PersonalInfoInputs>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
    },
  });

  // Academic info form
  const academicInfoForm = useForm<AcademicInfoInputs>({
    resolver: zodResolver(academicInfoSchema),
    defaultValues: {
      college: "",
      //   department: user?. || "",
      //   year: user?.year || "",
    },
  });

  // Confirmation form
  const confirmationForm = useForm<ConfirmationInputs>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      terms: false,
    },
  });

  const onPersonalInfoSubmit = (data: PersonalInfoInputs) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onAcademicInfoSubmit = (data: AcademicInfoInputs) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep(3);
  };

  const onConfirmationSubmit = async (data: ConfirmationInputs) => {
    setIsSubmitting(true);
    const finalFormData = { ...formData, ...data };

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Registration completed successfully!");
      router.push(`/events/${eventId}/ticket`);
    }, 1500);
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-between">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= i
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > i ? <Check className="h-4 w-4" /> : i}
            </div>
            <span className="mt-1 text-xs">
              {i === 1 ? "Personal" : i === 2 ? "Academic" : "Confirmation"}
            </span>
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <Form {...personalInfoForm}>
            <form
              onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <FormField
                control={personalInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...academicInfoForm}>
            <form
              onSubmit={academicInfoForm.handleSubmit(onAcademicInfoSubmit)}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold">Academic Information</h2>
              <FormField
                control={academicInfoForm.control}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College/University</FormLabel>
                    <FormControl>
                      <Input placeholder="Your college name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={academicInfoForm.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Your department" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={academicInfoForm.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="Year of study" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit">
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === 3 && (
          <Form {...confirmationForm}>
            <form
              onSubmit={confirmationForm.handleSubmit(onConfirmationSubmit)}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold">Confirm Registration</h2>

              <div className="space-y-3 rounded-lg border bg-gray-50 p-4">
                <h3 className="font-medium">Registration Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Event:</span>
                    <span className="font-medium">{eventTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">College:</span>
                    <span>{formData.college}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span>{formData.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year:</span>
                    <span>{formData.year}</span>
                  </div>
                </div>
              </div>

              <FormField
                control={confirmationForm.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="mt-1 h-4 w-4"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms and conditions of this event
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Complete Registration"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </motion.div>
    </div>
  );
};

export default EventRegistrationForm;
