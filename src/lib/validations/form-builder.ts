import { z } from "zod";

/**
 * Form Field Types
 */
export const formFieldTypeSchema = z.enum([
  "text",
  "email",
  "tel",
  "number",
  "textarea",
  "select",
  "radio",
  "checkbox",
  "file",
  "date",
  "url",
  "time",
]);

/**
 * Field Option Schema (for select, radio, checkbox)
 */
export const fieldOptionSchema = z.object({
  label: z.string().min(1, "Option label is required"),
  value: z.string().min(1, "Option value is required"),
});

/**
 * Validation Rule Schema
 */
export const validationRuleSchema = z.object({
  type: z.enum([
    "required",
    "minLength",
    "maxLength",
    "pattern",
    "min",
    "max",
    "email",
    "url",
  ]),
  value: z.union([z.string(), z.number(), z.boolean()]).optional(),
  message: z.string().optional(),
});

/**
 * Conditional Logic Schema
 */
export const conditionalSchema = z.object({
  field: z.string(),
  operator: z.enum(["equals", "notEquals", "contains"]),
  value: z.string(),
});

/**
 * Form Field Schema
 */
export const formFieldSchema = z.object({
  id: z.string(),
  type: formFieldTypeSchema,
  label: z.string().min(1, "Label is required"),
  name: z.string().min(1, "Field name is required"),
  placeholder: z.string().optional(),
  helpText: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(fieldOptionSchema).optional(),
  validation: z.array(validationRuleSchema).optional(),
  order: z.number(),
  conditional: conditionalSchema.optional(),
});

/**
 * Event Form Schema
 */
export const eventFormSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  formSchema: z.array(formFieldSchema),
  title: z.string().optional(),
  description: z.string().optional(),
  successMessage: z.string().default("Thank you for registering!").optional(),
});

/**
 * Form Submission Schema
 */
export const formSubmissionSchema = z.object({
  formId: z.string().min(1, "Form ID is required"),
  eventId: z.string().min(1, "Event ID is required"),
  userId: z.string().optional(),
  responses: z.record(z.string(), z.any()),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

/**
 * Update Form Submission Status Schema
 */
export const updateSubmissionStatusSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
  adminNotes: z.string().optional(),
});

/**
 * Event Creation/Update Schema
 */
export const eventSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  timeline: z.string().optional(),
  prizes: z.string().optional(),
  faqs: z.string().optional(),
  organizerContact: z.string().optional(),
  coOrganizerContact: z.string().optional(),
  discordLink: z.string().url().optional().or(z.literal("")),
  whatsappLink: z.string().url().optional().or(z.literal("")),
  bannerImage: z.string().url().optional().or(z.literal("")),
  gallery: z.string().optional(),
  details: z.string().optional(),
  rules: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
});

// Export types
export type FormFieldType = z.infer<typeof formFieldTypeSchema>;
export type FieldOption = z.infer<typeof fieldOptionSchema>;
export type ValidationRule = z.infer<typeof validationRuleSchema>;
export type Conditional = z.infer<typeof conditionalSchema>;
export type FormField = z.infer<typeof formFieldSchema>;
export type EventFormInput = z.infer<typeof eventFormSchema>;
export type FormSubmissionInput = z.infer<typeof formSubmissionSchema>;
export type UpdateSubmissionStatus = z.infer<
  typeof updateSubmissionStatusSchema
>;
export type EventInput = z.infer<typeof eventSchema>;
