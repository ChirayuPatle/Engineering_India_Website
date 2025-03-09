import { type Event } from "@/context/eventContext";
import { format } from "date-fns";
import { type Ticket } from "./event-types";

// Mock event data
const mockEvent: Event = {
  id: "1",
  title: "Professional Design Conference 2023",
  category: "Conference",
  spots: 500,
  description: `Join us for the premier design conference of the year, bringing together the best minds in UX/UI, graphic design, branding, and product design.

This immersive two-day experience features keynote presentations from industry leaders, hands-on workshops, and networking opportunities with top designers from around the world.

Learn about the latest design trends, tools, and methodologies that are shaping the future of digital and physical product experiences. Whether you're a seasoned professional or just starting your design journey, this conference offers valuable insights for every level.`,
  start_date: "2023-11-15T09:00:00.000Z",
  end_date: "2023-11-16T17:00:00.000Z",
  venue: "Design Center, New York",
  image:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2340",
  registration_mode: "INDIVIDUAL",
  spots_filled: 358,
  fee: 299,
  organizer: {
    name: "Design Professionals Association",
    email: "contact@designprofessionals.org",
    phone: "+1 212 555 7890",
  },
  gallery: [
    "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=2340",
    "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&q=80&w=2340",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2340",
    "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=2340",
    "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=2342",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=2340",
  ],
  faqs: [
    {
      question: "What's included in the registration fee?",
      answer:
        "Your registration includes access to all keynote presentations, workshops, networking events, coffee breaks, and lunch on both days. You'll also receive a conference goodie bag with exclusive design merchandise.",
    },
    {
      question: "Is there a student discount available?",
      answer:
        "Yes, students with valid ID can register at a 50% discount. Please email a copy of your student ID to studentregistration@designconference2023.com after completing registration.",
    },
    {
      question: "What's the cancellation policy?",
      answer:
        "Cancellations made 30 days before the event will receive a full refund minus a $50 processing fee. Cancellations made within 30 days will receive a 50% refund. No refunds will be issued for cancellations within 7 days of the event.",
    },
    {
      question: "Will the sessions be recorded?",
      answer:
        "Yes, all keynote presentations and selected workshops will be recorded. Attendees will receive access to the recordings approximately two weeks after the event.",
    },
    {
      question: "Is there a dress code?",
      answer:
        "The dress code is smart casual. We recommend comfortable clothing and shoes as you'll be moving between sessions throughout the day.",
    },
  ],
  prizes: [
    {
      position: "Design Challenge Winner",
      description: "First place in our annual design competition",
      value: "Full Access Pass to next year's conference + $1,000",
    },
    {
      position: "Best Portfolio",
      description: "Selected by our panel of industry experts",
      value: "Mentorship program with leading designers",
    },
    {
      position: "Community Choice Award",
      description: "Voted by conference attendees",
      value: "Professional design software bundle",
    },
  ],
  schedule: [
    {
      time: "09:00",
      activity: "Registration & Breakfast",
      location: "Main Lobby",
    },
    {
      time: "10:00",
      activity: "Opening Keynote: The Future of Design",
      location: "Grand Ballroom",
      speakers: ["Sarah Johnson, Design Director at Google"],
    },
    {
      time: "11:30",
      activity: "Workshop: UI Animation Principles",
      location: "Workshop Room A",
      speakers: ["Michael Chen, Motion Designer"],
    },
    {
      time: "13:00",
      activity: "Lunch Break & Networking",
      location: "Garden Terrace",
    },
    {
      time: "14:00",
      activity: "Panel Discussion: Ethical Design in the Age of AI",
      location: "Grand Ballroom",
      speakers: ["Various Industry Leaders"],
    },
    {
      time: "15:30",
      activity: "Workshop: Design Systems at Scale",
      location: "Workshop Room B",
      speakers: ["Emily Rodriguez, UX Director at Spotify"],
    },
    {
      time: "17:00",
      activity: "Networking Reception",
      location: "Rooftop Lounge",
    },
  ],
  tags: [
    "Design",
    "UX/UI",
    "Professional Development",
    "Workshops",
    "Networking",
  ],
};

const pastEvent: Event = {
  id: "2",
  title: "Tech Innovation Summit 2022",
  category: "Summit",
  spots: 1000,
  description: `The Tech Innovation Summit brought together entrepreneurs, developers, investors, and thought leaders from across the technology sector to explore cutting-edge developments and future trends.

Participants engaged in discussions about AI advancements, blockchain applications, sustainable tech, and the evolving landscape of remote work technologies.

The summit featured hands-on demonstrations of emerging technologies, investor pitch sessions, and collaborative problem-solving workshops addressing real-world challenges.`,
  start_date: "2022-06-10T09:00:00.000Z",
  end_date: "2022-06-12T17:00:00.000Z",
  venue: "Tech Hub Convention Center, San Francisco",
  image:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2340",
  registration_mode: "INDIVIDUAL",
  spots_filled: 845,
  fee: 499,
  organizer: {
    name: "Future Tech Foundation",
    email: "events@futuretechfoundation.org",
    phone: "+1 415 555 1234",
  },
  gallery: [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2340",
    "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&q=80&w=2340",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2112",
    "https://images.unsplash.com/photo-1540294986-8d4c36aa195a?auto=format&fit=crop&q=80&w=2338",
    "https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80&w=2340",
    "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&q=80&w=2340",
  ],
  faqs: [
    {
      question: "Are the presentation slides available after the event?",
      answer:
        "Yes, all presenters have agreed to share their slides. Attendees received access to a digital resource library two weeks after the summit.",
    },
    {
      question: "Was there a startup pitch competition?",
      answer:
        "Yes, the summit featured a pitch competition with over $100,000 in prize money. Twenty startups were selected to present to a panel of venture capitalists.",
    },
    {
      question: "What networking opportunities were available?",
      answer:
        "The summit included structured networking sessions, a networking app for attendees, evening receptions, and themed lunch tables for specific industries and interests.",
    },
  ],
  schedule: [
    {
      time: "09:00",
      activity: "Opening Ceremony",
      location: "Main Stage",
    },
    {
      time: "10:00",
      activity: "Keynote: The AI Revolution",
      location: "Main Stage",
      speakers: ["Dr. Alan Turing, AI Research Director"],
    },
    {
      time: "11:30",
      activity: "Panel: Blockchain Beyond Cryptocurrency",
      location: "Innovation Theater",
    },
    {
      time: "13:00",
      activity: "Networking Lunch",
      location: "Grand Hall",
    },
    {
      time: "14:30",
      activity: "Startup Pitch Competition (Round 1)",
      location: "Venture Stage",
    },
    {
      time: "16:00",
      activity: "Workshop: Building Sustainable Tech Companies",
      location: "Workshop Pavilion",
    },
  ],
  prizes: [
    {
      position: "Best Startup Pitch",
      description: "First place in startup competition",
      value: "$50,000 seed funding",
    },
    {
      position: "Innovation Award",
      description: "Most innovative technology solution",
      value: "Mentorship package and office space",
    },
  ],
  tags: ["Technology", "Innovation", "AI", "Blockchain", "Startups"],
};

// Function to get event details
export const getEventById = async (id: string): Promise<Event> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return different mock events based on ID
  if (id === "2") {
    return pastEvent;
  }

  return mockEvent;
};

// Function to register for an event
export const registerForEvent = async (formData: any): Promise<Ticket> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Get the event (in a real app we'd use the eventId from formData)
  const event = await getEventById("1");

  // Generate a QR code (in real app, this would be a server call)
  const qrData = `EVENT:${event.id}|USER:${formData.email}|DATE:${new Date().toISOString()}`;

  // Generate ticket
  return {
    ticketId: Math.random().toString(36).substring(2, 15),
    eventId: event.id,
    eventTitle: event.title,
    attendeeName: formData.name,
    attendeeEmail: formData.email,
    dateIssued: format(new Date(), "PPP"),
    startDate: format(new Date(event.start_date), "PPP"),
    venue: event.venue,
    qrCode: qrData,
  };
};

export const checkRegistrationStatus = async (
  eventId: string,
  email: string,
): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // For demo purposes, always return false (not registered)
  return false;
};

// Function to get multiple events for events page
export const getEvents = async (): Promise<Event[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [mockEvent, pastEvent];
};
