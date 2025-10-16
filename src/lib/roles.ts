// User roles definition
export const UserRole = {
  USER: "USER",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// Helper function to check if user is admin
export function isAdmin(role: string | null | undefined): boolean {
  return role === UserRole.ADMIN;
}

// Helper function to check if user is moderator or admin
export function isModerator(role: string | null | undefined): boolean {
  return role === UserRole.MODERATOR || role === UserRole.ADMIN;
}

// Helper function to check if user has elevated privileges
export function hasElevatedPrivileges(
  role: string | null | undefined,
): boolean {
  return role === UserRole.ADMIN || role === UserRole.MODERATOR;
}
