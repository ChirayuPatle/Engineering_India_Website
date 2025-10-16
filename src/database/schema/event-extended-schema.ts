import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { event } from "./event-schema";
import { user, registration } from "./index";
import { v4 as uuid } from "uuid";

/**
 * Event Payment Configuration
 * Stores payment details for each event (UPI IDs, QR codes, etc.)
 */
export const eventPaymentConfig = sqliteTable("event_payment_config", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  eventId: text("event_id")
    .notNull()
    .unique()
    .references(() => event.id, { onDelete: "cascade" }),

  // Payment details
  paymentRequired: integer("payment_required", { mode: "boolean" })
    .notNull()
    .default(false),
  amount: text("amount"), // e.g., "500" or "Free"
  currency: text("currency").default("INR"),

  // UPI Details
  upiIds: text("upi_ids", { mode: "json" }).$type<string[]>().default([]),
  qrCodeUrl: text("qr_code_url"),

  // Bank details (optional)
  bankDetails: text("bank_details", { mode: "json" }).$type<{
    accountName?: string;
    accountNumber?: string;
    ifscCode?: string;
    bankName?: string;
  }>(),

  // Instructions
  paymentInstructions: text("payment_instructions"),

  // Deadlines
  paymentDeadline: integer("payment_deadline", { mode: "timestamp" }),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Event Resources
 * Stores downloadable materials, templates, guidelines, etc.
 */
export const eventResource = sqliteTable("event_resource", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),

  // Resource details
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // template, guideline, reference, other
  fileUrl: text("file_url").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size"), // in bytes

  // Access control
  accessLevel: text("access_level").notNull().default("public"), // public, registered, approved
  phaseId: text("phase_id"), // Optional: link to specific phase

  // Display order
  order: integer("order").default(0),

  // Metadata
  uploadedBy: text("uploaded_by").references(() => user.id),
  downloadCount: integer("download_count").default(0),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Event Phases (for multi-round events like hackathons)
 * Each phase can have its own forms, deadlines, and resources
 */
export const eventPhase = sqliteTable("event_phase", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),

  // Phase details
  name: text("name").notNull(), // e.g., "Round 1: PPT Submission"
  description: text("description"),
  phaseNumber: integer("phase_number").notNull(), // 1, 2, 3...

  // Timeline
  startDate: integer("start_date", { mode: "timestamp" }),
  endDate: integer("end_date", { mode: "timestamp" }),

  // Status
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(false),

  // Requirements
  requiresPreviousPhaseCompletion: integer("requires_previous_phase", {
    mode: "boolean",
  }).default(true),

  // Instructions
  instructions: text("instructions"),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Phase Forms
 * Forms specific to each phase (e.g., PPT submission form for Round 1)
 */
export const phaseForm = sqliteTable("phase_form", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  phaseId: text("phase_id")
    .notNull()
    .references(() => eventPhase.id, { onDelete: "cascade" }),

  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),

  // Form configuration
  title: text("title").notNull(),
  description: text("description"),
  formSchema: text("form_schema", { mode: "json" }).notNull().$type<any[]>(),

  // Settings
  allowMultipleSubmissions: integer("allow_multiple", {
    mode: "boolean",
  }).default(false),
  submissionDeadline: integer("submission_deadline", { mode: "timestamp" }),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Phase Submissions
 * User submissions for phase-specific forms
 */
export const phaseSubmission = sqliteTable("phase_submission", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  phaseFormId: text("phase_form_id")
    .notNull()
    .references(() => phaseForm.id, { onDelete: "cascade" }),

  phaseId: text("phase_id")
    .notNull()
    .references(() => eventPhase.id, { onDelete: "cascade" }),

  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),

  registrationId: text("registration_id")
    .notNull()
    .references(() => registration.id, { onDelete: "cascade" }),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  // Submission data
  responses: text("responses", { mode: "json" })
    .notNull()
    .$type<Record<string, any>>(),
  fileUrls: text("file_urls", { mode: "json" }).$type<string[]>(), // For file uploads

  // Status
  status: text("status").notNull().default("submitted"), // submitted, reviewed, accepted, rejected
  score: integer("score"),
  feedback: text("feedback"),
  reviewedBy: text("reviewed_by").references(() => user.id),
  reviewedAt: integer("reviewed_at", { mode: "timestamp" }),

  submittedAt: integer("submitted_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Event FAQ Categories (for better organization)
 */
export const eventFaqCategory = sqliteTable("event_faq_category", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  order: integer("order").default(0),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Event FAQs (structured)
 */
export const eventFaq = sqliteTable("event_faq", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),

  categoryId: text("category_id").references(() => eventFaqCategory.id, {
    onDelete: "set null",
  }),

  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").default(0),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Export types
export type EventPaymentConfig = typeof eventPaymentConfig.$inferSelect;
export type NewEventPaymentConfig = typeof eventPaymentConfig.$inferInsert;
export type EventResource = typeof eventResource.$inferSelect;
export type NewEventResource = typeof eventResource.$inferInsert;
export type EventPhase = typeof eventPhase.$inferSelect;
export type NewEventPhase = typeof eventPhase.$inferInsert;
export type PhaseForm = typeof phaseForm.$inferSelect;
export type NewPhaseForm = typeof phaseForm.$inferInsert;
export type PhaseSubmission = typeof phaseSubmission.$inferSelect;
export type NewPhaseSubmission = typeof phaseSubmission.$inferInsert;
export type EventFaq = typeof eventFaq.$inferSelect;
export type EventFaqCategory = typeof eventFaqCategory.$inferSelect;
