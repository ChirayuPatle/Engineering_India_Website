import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { event } from "./event-schema";
import { v4 as uuid } from "uuid";

/**
 * Event Form Schema
 * Stores the complete form configuration for each event
 */
export const eventForm = sqliteTable("event_form", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),

  // Store the complete form configuration as JSON
  formSchema: text("form_schema", { mode: "json" })
    .notNull()
    .$type<FormField[]>(),

  // Form settings
  title: text("title"),
  description: text("description"),
  successMessage: text("success_message").default("Thank you for registering!"),
  formImage: text("form_image"), // QR code or banner image URL

  // Timestamps
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Form Field Type Definition
 */
export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "file"
  | "date"
  | "url"
  | "time";

/**
 * Validation Rules for Form Fields
 */
export type ValidationRule = {
  type:
    | "required"
    | "minLength"
    | "maxLength"
    | "pattern"
    | "min"
    | "max"
    | "email"
    | "url";
  value?: string | number | boolean;
  message?: string;
};

/**
 * Form Field Configuration
 */
export type FormField = {
  id: string;
  type: FormFieldType;
  label: string;
  name: string;
  placeholder?: string;
  helpText?: string;
  required: boolean;

  // For select, radio, checkbox
  options?: Array<{
    label: string;
    value: string;
  }>;

  // Validation rules
  validation?: ValidationRule[];

  // Field ordering
  order: number;

  // Conditional logic (future enhancement)
  conditional?: {
    field: string;
    operator: "equals" | "notEquals" | "contains";
    value: string;
  };
};

/**
 * Form Submissions
 * Stores user responses to event registration forms
 */
export const formSubmission = sqliteTable("form_submission", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  formId: text("form_id")
    .notNull()
    .references(() => eventForm.id, { onDelete: "cascade" }),

  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),

  userId: text("user_id"), // Can be null for anonymous submissions

  // Store all form responses as JSON
  responses: text("responses", { mode: "json" })
    .notNull()
    .$type<Record<string, any>>(),

  // Submission metadata
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),

  // Admin actions
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  adminNotes: text("admin_notes"),

  // Timestamps
  submittedAt: integer("submitted_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Form Analytics
 * Track form views and completion rates
 */
export const formAnalytics = sqliteTable("form_analytics", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  formId: text("form_id")
    .notNull()
    .references(() => eventForm.id, { onDelete: "cascade" }),

  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),

  // Metrics
  views: integer("views").notNull().default(0),
  submissions: integer("submissions").notNull().default(0),

  // Daily breakdown
  date: text("date").notNull(), // YYYY-MM-DD format

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Export types for use in components
export type EventForm = typeof eventForm.$inferSelect;
export type NewEventForm = typeof eventForm.$inferInsert;
export type FormSubmission = typeof formSubmission.$inferSelect;
export type NewFormSubmission = typeof formSubmission.$inferInsert;
export type FormAnalytics = typeof formAnalytics.$inferSelect;
