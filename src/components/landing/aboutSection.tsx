import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              About Engineering India
            </h2>
            <p className="mb-6 text-muted-foreground">
              Engineering India is a dynamic student-led organization at YCCE
              College, Nagpur, dedicated to fostering innovation, technical
              excellence, and social responsibility among engineering students.
            </p>
            <p className="mb-6 text-muted-foreground">
              Founded with a vision to bridge the gap between academic learning
              and real-world applications, our club provides a platform for
              students to develop their technical skills, leadership abilities,
              and social awareness through various activities and initiatives.
            </p>
            <div className="mb-8 flex flex-wrap gap-8">
              <div>
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">
                  Events Organized
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground">Student Members</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">20+</p>
                <p className="text-sm text-muted-foreground">
                  Social Initiatives
                </p>
              </div>
            </div>
            <Button variant="outline">
              <Link href="/about" className="group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex h-40 items-center justify-center rounded-lg bg-primary/10 p-6">
                <h3 className="text-center text-xl font-medium">
                  Technical Workshops
                </h3>
              </div>
              <div className="flex h-56 items-center justify-center rounded-lg bg-primary/20 p-6">
                <h3 className="text-center text-xl font-medium">
                  Social Outreach
                </h3>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex h-56 items-center justify-center rounded-lg bg-primary/15 p-6">
                <h3 className="text-center text-xl font-medium">
                  Competitions
                </h3>
              </div>
              <div className="flex h-40 items-center justify-center rounded-lg bg-primary/5 p-6">
                <h3 className="text-center text-xl font-medium">
                  Industry Visits
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
