import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "@/env";
import "dotenv/config";

async function fixProductionSchema() {
  console.log("🔧 Fixing production database schema...");

  const client = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });

  const db = drizzle(client);

  try {
    // First, check if the event_form table exists
    const checkTableQuery = `
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='event_form';
    `;

    const tableExists = await client.execute(checkTableQuery);
    console.log(
      "📋 Table check:",
      tableExists.rows.length > 0
        ? "event_form exists"
        : "event_form does not exist",
    );

    // Check existing indexes on event_form
    const checkIndexesQuery = `
      SELECT name FROM sqlite_master 
      WHERE type='index' AND tbl_name='event_form';
    `;

    const indexes = await client.execute(checkIndexesQuery);
    console.log(
      "📊 Existing indexes on event_form:",
      indexes.rows.map((r) => r.name),
    );

    // Check if there's already a unique constraint on event_id
    const checkUniqueQuery = `
      SELECT sql FROM sqlite_master 
      WHERE type='table' AND name='event_form';
    `;

    const tableSchema = await client.execute(checkUniqueQuery);
    console.log("📝 Current table schema:", tableSchema.rows[0]);

    // If the unique index doesn't exist, create it
    const hasUniqueIndex = indexes.rows.some(
      (row: any) => row.name === "event_form_event_id_unique",
    );

    if (!hasUniqueIndex) {
      console.log("➕ Creating missing unique index...");
      await client.execute(
        `CREATE UNIQUE INDEX IF NOT EXISTS event_form_event_id_unique ON event_form(event_id);`,
      );
      console.log("✅ Unique index created successfully!");
    } else {
      console.log("✓ Unique index already exists");
    }

    console.log("\n✨ Production database schema is now synchronized!");
    console.log("You can now run 'pnpm drizzle-kit push' safely.");
  } catch (error) {
    console.error("❌ Error fixing schema:", error);
    throw error;
  } finally {
    client.close();
  }
}

fixProductionSchema()
  .then(() => {
    console.log("\n🎉 Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Failed:", error);
    process.exit(1);
  });
