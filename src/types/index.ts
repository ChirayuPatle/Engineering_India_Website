export type Role = "ADMIN" | "USER" | "VOLUNTEER";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: Role;
  createdAt: number;
  updatedAt: number;
}
