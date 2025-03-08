"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RegistrationCard, { Registration } from "@/components/dashboard/RegistrationCard";
import NotFound from "@/components/dashboard/Notfound";

// const registrations: Registration[] = [];

const registrations: Registration[] = [
  {
    id: "1",
    title: "Web Development Workshop",
    description:
      "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
    date: "March 15, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Computer Science Building, Room 101",
    status: "upcoming",
    ticketId: "WDW-2025-1234",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Introduction to Machine Learning",
    description:
      "A beginner-friendly introduction to machine learning concepts and applications.",
    date: "February 10, 2025",
    time: "4:00 PM - 6:00 PM",
    location: "Computer Science Building, Room 203",
    status: "completed",
    ticketId: "IML-2025-5678",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "GitHub Workshop",
    description:
      "Learn how to use Git and GitHub for version control and collaboration.",
    date: "January 25, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Computer Science Building, Lab 102",
    status: "pending",
    ticketId: "GHW-2025-9012",
    image: "/placeholder.svg?height=200&width=400",
  },
];


export default function RegistrationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            My Registrations
          </h1>
        </div>

        {registrations.length === 0 ? (
          <NotFound />
        ) : (
          <div className="grid gap-6">
            {registrations.map((reg) => (
              <RegistrationCard reg={reg} key={reg.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
