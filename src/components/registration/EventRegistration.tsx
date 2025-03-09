"use client";

import { Button } from "@/components/ui/button";
import { registerForEvent } from "@/lib/event-mock-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { useToast } from "@/hooks/use-toast";
import { type Event } from "@/context/eventContext";
import toast from "react-hot-toast";
import EventTicket from "./EventTicket";
import RegistrationForm from "./RegistrationForm";

interface EventRegistrationProps {
  event: Event;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  teamName: z.string().optional(),
  teamMembers: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, { message: "Name must be at least 2 characters." }),
        email: z
          .string()
          .email({ message: "Please enter a valid email address." }),
      }),
    )
    .optional(),
});

type RegistrationFormValues = z.infer<typeof formSchema>;

const EventRegistration = ({ event }: EventRegistrationProps) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticket, setTicket] = useState<any>(null);
  // const { toast } = useToast();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      teamName: "",
      teamMembers:
        event.event_registration_mode === "TEAM" ? [{ name: "", email: "" }] : [],
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      setIsSubmitting(true);
      const ticketData = await registerForEvent(data);
      setTicket(ticketData);
      
      toast.success("Registration successful! Your ticket has been generated.");
    } catch (error) {
      toast.error(
        "Registration failed. There was an error processing your registration. Please try again.",
      );
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if event has passed
  const eventHasPassed = new Date(event.event_end_date || "") < new Date();

  if (eventHasPassed) {
    return (
      <div className="rounded-lg bg-gray-100 p-6 text-center">
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          This event has ended
        </h3>
        <p className="text-gray-600">
          Registration is no longer available for this event.
        </p>
      </div>
    );
  }

  return (
    <section className="animate-slide-up">
      <h2 className="section-title">Registration</h2>

      {!showForm && !ticket && (
        <div className="rounded-lg bg-white p-6 text-center shadow-sm">
          <h3 className="mb-3 text-xl font-bold text-gray-900">
            Join this event
          </h3>
          <p className="mb-6 text-gray-600">
            {event.event_registration_mode === "TEAM"
              ? "Register with your team and be part of this amazing experience!"
              : "Secure your spot for this event now!"}
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-event-purple hover:bg-event-dark-purple px-8 py-2 text-white"
          >
            Register Now
          </Button>
        </div>
      )}

      {showForm && !ticket && (
        <RegistrationForm
          form={form}
          isTeamEvent={event.event_registration_mode === "TEAM"}
          isPaidEvent={!!event.registration_fee}
          eventPrice={event.registration_fee || 0}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {ticket && <EventTicket ticket={ticket} />}
    </section>
  );
};

export default EventRegistration;
