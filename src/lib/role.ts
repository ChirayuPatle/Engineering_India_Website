import { type User } from "@/types/index"; // your user type

export function isAdmin(user: User | null): boolean {
  return user?.role === "ADMIN";
}

export function isVolunteer(user: User | null): boolean {
  return user?.role === "VOLUNTEER";
}

export function isUser(user: User | null): boolean {
  return user?.role === "USER";
}
