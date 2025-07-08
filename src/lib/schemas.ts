import { z } from "zod";

export const membershipFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  year: z.string().min(1, "Year is required"),
  branch: z.string().min(1, "Branch is required"),
  email: z.string().email("Invalid email address"),
  areaOfInterest: z
    .array(z.string())
    .min(1, "Select at least one area of interest"),
  engagedInOtherClub: z.boolean(),
  previousExperience: z.string().optional(),
  reasonToJoin: z.string().min(1, "Reason to join is required"),
  eventIdeas: z.string().optional(),
});

export type MembershipFormSchema = z.infer<typeof membershipFormSchema>;

const teamMemberSchema = z.object({
  name: z.string().min(1, "Member name is required"),
  email: z.string().email("Invalid email address"),
});

export const eventRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be 10 digits"),
  college: z.string().min(1, "College name is required"),
  branch: z.string().min(1, "Branch is required"),
  year: z.string().min(1, "Year is required"),
  teamName: z.string().optional(),
  teamMembers: z.array(teamMemberSchema).optional(),
  paymentId: z.string().optional(),
  eventId: z.string(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
});

export type EventRegistrationSchema = z.infer<typeof eventRegistrationSchema>;
