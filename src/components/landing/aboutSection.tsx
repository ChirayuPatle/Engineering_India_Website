import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Image from "next/image";

export default function AboutSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#text", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#page1",
        start: "60%",
        // markers: true,
        toggleActions: "play none none reverse",
        scrub: 1,
      },
    });

    gsap.from("#box", {
      opacity: 0,
      scale: 0.6,
      y: 100,
      duration: 1,
      ease: "power2",
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#page1",
        start: "70%",
        // markers: true,
        toggleActions: "play none none reverse",
        scrub: 3,
      },
    });
  }, []);

  return (
    <section className="py-16 text-zinc-700 md:py-24">
      <div className="container mx-auto px-8">
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
              <div id="text">
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">
                  Events Organized
                </p>
              </div>
              <div id="text">
                <p className="text-4xl font-bold text-primary">250+</p>
                <p className="text-sm text-muted-foreground">Student Members</p>
              </div>
              <div id="text">
                <p className="text-4xl font-bold text-primary">8+</p>
                <p className="text-sm text-muted-foreground">
                  Social Initiatives
                </p>
              </div>
            </div>
            <Button variant="outline">
              <Link href="/about" className="group">
                <div className="flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-lg border-2 bg-primary/10">
                <Image
                  src="https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217195/Defences_uvgzwe.jpg"
                  alt="UST Image"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative flex h-56 items-center justify-center rounded-lg border-2 bg-primary/20">
                <Image
                  src="/image/Donation.JPG"
                  alt="UST Image"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="relative flex h-56 items-center justify-center rounded-lg border-2 bg-primary/15">
                <Image
                  src="/image/Ust-event1-1.JPG"
                  alt="UST Image"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-lg border-2 bg-primary/5">
                <Image
                  src="/image/Team.JPG"
                  alt="UST Image"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
