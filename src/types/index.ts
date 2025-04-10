export type Role = "ADMIN" | "USER" | "VOLUNTEER";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  collegeName?: string;
  year?: string;
  branch?: string;
  image?: string | null;
  role: Role;
  createdAt: number;
  updatedAt: number;
}
