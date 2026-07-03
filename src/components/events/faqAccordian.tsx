import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is ETHDenver?",
    answer:
      "ETHDenver is the world's largest and longest running blockchain-powered hackathon, bringing together innovators from over 125 countries.",
  },
  {
    question: "Who can participate?",
    answer:
      "Anyone interested in blockchain technology, development, design, or entrepreneurship can participate. We welcome all skill levels.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "No, ETHDenver is free to attend for accepted participants. However, you must apply and be selected to participate.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring your laptop, charger, and any other equipment you need for development. We'll provide food, drinks, and a comfortable working environment.",
  },
  {
    question: "How are prizes awarded?",
    answer:
      "Prizes are awarded based on innovation, technical complexity, design, and potential impact. Different sponsors have their own prize categories and criteria.",
  },
];

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
