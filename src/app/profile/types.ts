export interface User {
  name: string;
  email: string;
  avatar?: string;
  college?: string;
  completionPercentage: number;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface Event {
  id: string;
  title: string;
  organizer: string;
  deadline: string;
  status: "upcoming" | "ongoing" | "completed";
  registrationStatus: "complete" | "incomplete" | "pending";
  teamSize: number;
  type: string;
  image: string;
}

export interface EventDetails {
  title: string;
  description: string;
  timeline: Array<{
    date: string;
    title: string;
    description: string;
  }>;
  prizes: Array<{
    position: string;
    amount: number;
    benefits: string[];
  }>;
  eligibility: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}
