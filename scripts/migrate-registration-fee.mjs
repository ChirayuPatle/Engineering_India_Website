import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// Load environment variables
config({ path: "./.env.local" });

async function runMigration() {
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    const db = drizzle(client);

    console.log("🔄 Adding registration_fee column to event table...");
    
    // Run the migration
    await client.execute(`
      ALTER TABLE event ADD COLUMN registration_fee TEXT;
    `);

    console.log("✅ Migration completed successfully!");
    
    // Close connection
    client.close();
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
