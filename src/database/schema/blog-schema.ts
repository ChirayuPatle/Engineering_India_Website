import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";
import { v4 as uuid } from "uuid";

export const blog = sqliteTable(
  "blog",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => uuid()),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(), // Rich text content (HTML or Markdown)
    coverImage: text("cover_image"),
    author: text("author"),
    authorId: text("author_id").references(() => user.id, {
      onDelete: "set null",
    }),
    category: text("category"),
    tags: text("tags"), // JSON stringified array
    isPublished: integer("is_published", { mode: "boolean" })
      .notNull()
      .default(false),
    publishedAt: integer("published_at", { mode: "timestamp" }),
    viewCount: integer("view_count").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("blog_slug_unique").on(table.slug),
  }),
);

export const blogComment = sqliteTable("blog_comment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),
  blogId: text("blog_id")
    .notNull()
    .references(() => blog.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  content: text("content").notNull(),
  isApproved: integer("is_approved", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
