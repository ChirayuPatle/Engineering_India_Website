"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Engineering India?",
    answer:
      "Engineering India is a social and technical club at YCCE College, Nagpur. We organize various events, workshops, competitions, and social initiatives to enhance the technical skills and social awareness of engineering students.",
  },
  {
    question: "How can I join Engineering India?",
    answer:
      "Any student from YCCE College can join Engineering India. We conduct membership drives at the beginning of each academic year. You can also reach out to us through our contact form or visit our office in the college campus.",
  },
  {
    question: "What types of events does the club organize?",
    answer:
      "We organize a wide range of events including cultural events, technical workshops, coding competitions, hackathons, guest lectures, industry visits and social outreach programs.",
  },
  {
    question: "Are there any membership fees?",
    answer:
      "No, our club is open to everyone. We believe in inclusivity, so you can join and participate in all activities and events for free!",
  },
  {
    question: "Can first-year students join the club?",
    answer:
      "We encourage first-year students to join and participate in our activities. It's a great way to build skills, network, and enhance your college experience from the beginning.",
  },
  {
    question: "In what domain I can volunteer ?",
    answer:
      "Members can volunteer for various roles in event organization, technical teams, literature, photography, designing and more. Just reach out to any of the club heads or coordinators to express your interest.",
  },
];

export default function Faq() {
  return (
    <section className="py-16 text-zinc-700 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Find answers to common questions about Engineering India club, our
            activities, and how to get involved.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <a href="/contact" className="text-blue-700 hover:underline">
                Contact us
              </a>{" "}
              for more information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
