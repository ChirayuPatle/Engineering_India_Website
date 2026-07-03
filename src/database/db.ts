import * as feedbackSchema from "@/database/schema/feedback-schema";
import {
  authSchema,
  eventSchema,
  membershipSchema,
  formBuilderSchema,
  blogSchema,
  hackathonSchema,
} from "@/database/schema/index";
import { env } from "@/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
// const db = drizzle({
//   connection: {
//     url: env.TURSO_DATABASE_URL,
//     authToken: env.TURSO_AUTH_TOKEN,
//   },
// });

export const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: {
    ...authSchema,
    ...eventSchema,
    ...feedbackSchema,
    ...membershipSchema,
    ...formBuilderSchema,
    ...blogSchema,
    ...hackathonSchema,
  },
});
