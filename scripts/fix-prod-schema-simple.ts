import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

async function fixProductionSchema() {
  console.log("🔧 Fixing production database schema...");

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error(
      "❌ Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env file",
    );
    process.exit(1);
  }

  const client = createClient({
    url,
    authToken,
  });

  try {
    // First, check if the event_form table exists
    console.log("📋 Checking event_form table...");
    const checkTableQuery = `
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='event_form';
    `;

    const tableExists = await client.execute(checkTableQuery);
    console.log("   Table exists:", tableExists.rows.length > 0);

    if (tableExists.rows.length === 0) {
      console.log("⚠️  event_form table does not exist. Run migrations first.");
      process.exit(1);
    }

    // Check existing indexes on event_form
    console.log("\n📊 Checking existing indexes...");
    const checkIndexesQuery = `
      SELECT name FROM sqlite_master 
      WHERE type='index' AND tbl_name='event_form';
    `;

    const indexes = await client.execute(checkIndexesQuery);
    console.log(
      "   Existing indexes:",
      indexes.rows.map((r: any) => r.name).join(", ") || "none",
    );

    // Check if there's already a unique constraint on event_id
    const hasUniqueIndex = indexes.rows.some(
      (row: any) => row.name === "event_form_event_id_unique",
    );

    if (!hasUniqueIndex) {
      console.log("\n➕ Creating missing unique index...");
      await client.execute(
        `CREATE UNIQUE INDEX IF NOT EXISTS event_form_event_id_unique ON event_form(event_id);`,
      );
      console.log(
        "   ✅ Unique index 'event_form_event_id_unique' created successfully!",
      );
    } else {
      console.log(
        "\n✓ Unique index 'event_form_event_id_unique' already exists",
      );
    }

    // Verify the index was created
    console.log("\n🔍 Verifying index...");
    const verifyIndexes = await client.execute(checkIndexesQuery);
    console.log(
      "   Current indexes:",
      verifyIndexes.rows.map((r: any) => r.name).join(", "),
    );

    console.log("\n✨ Production database schema is now synchronized!");
    console.log("   You can now run 'pnpm drizzle-kit push' safely.");
  } catch (error) {
    console.error("\n❌ Error fixing schema:", error);
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
