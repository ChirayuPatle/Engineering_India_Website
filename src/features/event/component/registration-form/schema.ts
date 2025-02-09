import * as z from "zod";

export const registrationSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  college: z.string().min(1, "Please select your college"),
  gender: z.string().min(1, "Please select your gender"),
  candidateType: z.string().min(1, "Please select candidate type"),
  isTeam: z.boolean(),
  teamName: z.string().optional(),
  teamMembers: z
    .array(
      z.object({
        name: z.string(),
        email: z.string().email(),
        college: z.string(),
        phone: z.string(),
      })
    )
    .optional(),
  country: z.string().min(1, "Please select your country"),
  paymentProof: z.any().optional(),
});
