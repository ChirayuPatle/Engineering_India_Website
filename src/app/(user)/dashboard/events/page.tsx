"use client"
import { EventCard } from "@/components/dashboard/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

// Mock data
const events = [
  {
    id: "1",
    title: "Tech Expo 2023",
    description:
      "Explore the latest in technology and innovation with hands-on demos and expert talks.",
    date: "Oct 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Main Campus, Building A",
    category: "Tech",
    spots: 100,
    spotsFilled: 75,
    price: 25,
    isRegistered: true,
  },
  {
    id: "2",
    title: "Coding Workshop",
    description:
      "Learn the fundamentals of web development with this hands-on workshop for beginners.",
    date: "Oct 20, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Science Lab",
    category: "Workshop",
    spots: 30,
    spotsFilled: 25,
    price: 15,
    isRegistered: true,
  },
  {
    id: "3",
    title: "Annual Hackathon",
    description:
      "Join teams to solve real-world problems with creative tech solutions in this 24-hour event.",
    date: "Nov 5, 2023",
    time: "9:00 AM - Nov 6, 9:00 AM",
    location: "Innovation Center",
    category: "Competition",
    spots: 150,
    spotsFilled: 98,
    price: 0,
    isRegistered: false,
  },
  {
    id: "4",
    title: "ML Study Group",
    description:
      "Weekly study session focused on machine learning algorithms and applications.",
    date: "Nov 10, 2023",
    time: "4:00 PM - 6:00 PM",
    location: "Library, Room 202",
    category: "Study",
    spots: 20,
    spotsFilled: 12,
    price: 0,
    isRegistered: false,
  },
  {
    id: "5",
    title: "Career Fair",
    description:
      "Connect with top tech companies and explore internship and job opportunities.",
    date: "Nov 15, 2023",
    time: "11:00 AM - 3:00 PM",
    location: "Student Union Building",
    category: "Career",
    spots: 200,
    spotsFilled: 150,
    price: 0,
    isRegistered: false,
  },
  {
    id: "6",
    title: "Entrepreneurship Panel",
    description:
      "Learn from successful founders about building startups and innovation.",
    date: "Nov 20, 2023",
    time: "5:00 PM - 7:00 PM",
    location: "Business School Auditorium",
    category: "Seminar",
    spots: 120,
    spotsFilled: 80,
    price: 10,
    isRegistered: false,
  },
];

export default function EventsPage() {
  const router = useRouter();
  // const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  type RegisterHandler = (id: string) => void;

  const handleRegister: RegisterHandler = (id) => {
    // toast({
    //   title: "Registration Successful",
    //   description: "You have successfully registered for this event.",
    // });

    console.info(`User registered for event with ID: ${id}`);

  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Club Events
          </h1>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Competition">Competition</SelectItem>
                <SelectItem value="Study">Study</SelectItem>
                <SelectItem value="Career">Career</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              location={event.location}
              category={event.category}
              spots={event.spots}
              spotsFilled={event.spotsFilled}
              price={event.price}
              isRegistered={event.isRegistered}
              onRegister={handleRegister}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
            <div className="flex flex-col items-center text-center">
              <h3 className="mt-2 text-xl font-semibold">No events found</h3>
              <p className="text-sm text-muted-foreground">
                Try changing your search or filter criteria
              </p>
            </div>
          </div>
        )}
      </div>
  );
}
