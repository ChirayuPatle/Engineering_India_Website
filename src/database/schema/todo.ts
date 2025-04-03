import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  completed: int("completed").notNull().default(0),
});
