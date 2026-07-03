import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const hackathonFeedback = sqliteTable("hackathon_feedback", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),

  // Personal Information
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  college: text("college").notNull(),
  branch: text("branch").notNull(),
  year: text("year").notNull(),

  // Feedback
  overallRating: integer("overall_rating").notNull(), // 1-5 stars
  experienceRating: integer("experience_rating").notNull(), // 1-5 stars
  organizationRating: integer("organization_rating").notNull(), // 1-5 stars

  // Text Feedback
  whatYouLiked: text("what_you_liked"), // What they enjoyed
  improvements: text("improvements"), // What can be improved
  suggestions: text("suggestions"), // Additional suggestions

  // Recommendation
  wouldRecommend: integer("would_recommend", { mode: "boolean" }).notNull(), // Would they recommend to others

  // Optional: Event-specific feedback
  venueRating: integer("venue_rating"), // 1-5 stars
  foodRating: integer("food_rating"), // 1-5 stars
  mentorshipRating: integer("mentorship_rating"), // 1-5 stars

  // Timestamps
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
