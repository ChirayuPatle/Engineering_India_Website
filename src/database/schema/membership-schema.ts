import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { user } from "./auth-schema";

export const membershipForm = sqliteTable("membership_form", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  year: text("year").notNull(),
  branch: text("branch").notNull(),
  email: text("email").notNull().unique(),
  areaOfInterest: text("area_of_interest"), // Store JSON as string
  engagedInOtherClub: integer("engaged_in_other_club", {
    mode: "boolean",
  }).notNull(),

  previousExperience: text("previous_experience"),
  reasonToJoin: text("reason_to_join").notNull(),
  eventIdeas: text("event_ideas"),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
