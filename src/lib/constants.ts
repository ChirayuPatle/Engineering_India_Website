import {
  BarChart3,
  Calendar,
  CreditCard,
  PenBox,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";

export const siteConfig = {
  name: "Engineering India",
  description: "Your gateway to technology and innovation",
  links: {
    github: "https://github.com/techclub",
    twitter: "https://twitter.com/techclub",
  },
  colors: {
    primary: "#2563EB", // Blue
    secondary: "#4F46E5", // Indigo
    accent: "#F59E0B", // Amber
    background: "#FFFFFF",
    text: "#1F2937",
    muted: "#6B7280",
  },
};

export const userNavItems = [
  { title: "Dashboard", icon: BarChart3, path: "/dashboard" },
  { title: "Profile", icon: User, path: "/dashboard/profile" },
  { title: "All Events", icon: Calendar, path: "/dashboard/events" },
  {
    title: "My Registrations",
    icon: Users,
    path: "/dashboard/registrations",
  },
  { title: "Payments", icon: CreditCard, path: "/dashboard/payments" },
];

export const adminNavItems = [
  { title: "Dashboard", icon: BarChart3, path: "/admin/dashboard" },
  { title: "Profile", icon: User, path: "/admin/dashboard/profile" },
  { title: "All Events", icon: Calendar, path: "/admin/dashboard/events" },
  {
    title: "Create Event",
    icon: PenBox,
    path: "/admin/dashboard/create-event",
  },
  {
    title: "All Registrations",
    icon: Users,
    path: "/admin/dashboard/registrations",
  },
  {
    title: "Manage Access",
    icon: ShieldAlert,
    path: "/admin/dashboard/manage-access",
  },
  // {
  //   title: "My Registrations",
  //   icon: Users,
  //   path: "/dashboard/registrations",
  // },
  // { title: "Payments", icon: CreditCard, path: "/dashboard/payments" },
];
