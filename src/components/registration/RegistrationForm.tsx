"use client";

import { type UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";

interface RegistrationFormProps {
  form: UseFormReturn<any>;
  isTeamEvent: boolean;
  isPaidEvent: boolean;
  eventPrice: number;
  isSubmitting: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const RegistrationForm = ({
  form,
  isTeamEvent,
  isPaidEvent,
  eventPrice,
  isSubmitting,
  onSubmit,
  onCancel,
}: RegistrationFormProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = isPaidEvent ? 3 : 2;

  const nextStep = () => {
    const currentFields =
      step === 1
        ? ["name", "email", "phone"]
        : step === 2 && isTeamEvent
          ? ["teamName"]
          : [];

    const isValid = currentFields.every(
      (field) => form.getFieldState(field).invalid === false,
    );

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      // Trigger validation
      form.trigger(currentFields as any);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const addTeamMember = () => {
    const teamMembers = form.getValues("teamMembers") || [];
    form.setValue("teamMembers", [...teamMembers, { name: "", email: "" }]);
  };

  const removeTeamMember = (index: number) => {
    const teamMembers = form.getValues("teamMembers") || [];
    if (teamMembers.length > 1) {
      const newTeamMembers = teamMembers.filter((_, i) => i !== index);
      form.setValue("teamMembers", newTeamMembers);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {step === 1
                ? "Personal Information"
                : step === 2 && isTeamEvent
                  ? "Team Information"
                  : "Payment Information"}
            </h3>
            <div className="text-sm text-gray-500">
              Step {step} of {totalSteps}
            </div>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="bg-event-purple h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
              </div>
            )}

            {step === 2 && isTeamEvent && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your team name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <FormLabel>Team Members</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTeamMember}
                      className="text-event-purple border-event-purple hover:bg-event-light-purple/50 h-8"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add Member
                    </Button>
                  </div>

                  {form
                    .watch("teamMembers")
                    ?.map((_member, index) => (
                      <div key={index} className="mb-4 space-y-3">
                        {index > 0 && <Separator className="my-4" />}

                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Team Member {index + 1}
                          </h4>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTeamMember(index)}
                              className="h-7 w-7 p-0 text-gray-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`teamMembers.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Member name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`teamMembers.${index}.email`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="member@example.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {step === (isTeamEvent ? 3 : 2) && isPaidEvent && (
              <div className="space-y-4">
                <div className="bg-event-light-purple mb-4 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Total Amount</div>
                    <div className="text-event-purple text-xl font-bold">
                      ${eventPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormDescription className="text-xs text-gray-500">
                  This is a demo form. No actual payment will be processed.
                </FormDescription>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step === 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                  className="text-gray-500"
                >
                  Cancel
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}

              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-event-purple hover:bg-event-dark-purple"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-event-purple hover:bg-event-dark-purple"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
