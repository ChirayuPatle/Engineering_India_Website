import "better-auth";

declare module "better-auth" {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null;
      role: string;
    };
  }
}
