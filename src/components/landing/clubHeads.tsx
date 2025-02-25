import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";

const clubHeads = [
  {
    name: "Rahul Sharma",
    position: "President",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com",
    email: "rahul@example.com",
  },
  {
    name: "Priya Patel",
    position: "Vice President",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com",
    email: "priya@example.com",
  },
  {
    name: "Amit Kumar",
    position: "Technical Head",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com",
    email: "amit@example.com",
  },
  {
    name: "Neha Singh",
    position: "Event Coordinator",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com",
    email: "neha@example.com",
  },
];

export default function ClubHeads() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center text-zinc-700">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Meet Our Team</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our dedicated team of student leaders works tirelessly to organize
            events, manage club activities, and create opportunities for all
            members.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {clubHeads.map((head) => (
            <Card
              key={head.name}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="relative aspect-square">
                <Image
                  src={head.image || "/placeholder.svg"}
                  alt={head.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold">{head.name}</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {head.position}
                </p>
                <div className="flex space-x-2">
                  <a
                    href={head.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Linkedin size={18} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href={`mailto:${head.email}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail size={18} />
                    <span className="sr-only">Email</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/team" className="font-medium text-primary hover:underline">
            View All Team Members →
          </a>
        </div>
      </div>
    </section>
  );
}
