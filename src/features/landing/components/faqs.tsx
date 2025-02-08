"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // adjust if you have your own Accordion implementation

const FAQ = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold text-center text-neutral-800 mb-8">
        FAQs
      </h2>
      <Accordion type="single" collapsible className="max-w-2xl mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-zinc-800 text-lg">
            Is Appwrite secure?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-500">
            Yes. Appwrite follows strict security protocols with advanced
            permissions and encryption.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-zinc-800 text-lg">
            Is it scalable?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-500">
            Absolutely. It’s designed to handle high-scale applications with
            real-time features.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-zinc-800 text-lg">
            How easy is integration?
          </AccordionTrigger>
          <AccordionContent className="text-neutral-500">
            Appwrite provides SDKs for multiple platforms to ensure seamless
            integration.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
