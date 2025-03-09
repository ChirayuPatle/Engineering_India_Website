"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type Event } from "@/context/eventContext";

interface EventFAQProps {
  event: Event;
}

const EventFAQ = ({ event }: EventFAQProps) => {
  if (!event.faqs || event.faqs.length === 0) {
    return null;
  }

  return (
    <section className="animate-slide-up">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
        {event.faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="px-6 text-left text-gray-800 hover:text-event-purple hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default EventFAQ;
