import { createClient } from "@libsql/client";
import "dotenv/config";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function fixHackathonEventId() {
  try {
    console.log("Checking if hackathon table exists...");

    // Check if table exists
    const tableCheck = await db.execute(`
      SELECT name FROM sqlite_master WHERE type='table' AND name='hackathon'
    `);

    if (tableCheck.rows.length === 0) {
      console.log("Table doesn't exist. Creating hackathon table...");

      // Create the table with nullable eventId
      await db.execute(`
        CREATE TABLE hackathon (
          id text PRIMARY KEY NOT NULL,
          event_id text,
          user_id text NOT NULL,
          team_name text NOT NULL,
          team_leader_name text NOT NULL,
          team_leader_email text NOT NULL,
          team_leader_phone text NOT NULL,
          team_leader_gender text NOT NULL,
          institute text NOT NULL,
          branch text NOT NULL,
          year text NOT NULL,
          team_members text,
          payment_screenshot text,
          transaction_id text,
          declaration_accepted integer NOT NULL,
          status text DEFAULT 'pending' NOT NULL,
          created_at integer NOT NULL,
          updated_at integer NOT NULL,
          FOREIGN KEY (user_id) REFERENCES user(id) ON UPDATE no action ON DELETE cascade
        )
      `);

      // Create unique index
      await db.execute(
        "CREATE UNIQUE INDEX hackathon_team_name_unique ON hackathon (team_name)",
      );

      console.log("✅ Hackathon table created successfully!");
    } else {
      console.log(
        "Table exists. Applying migration to make eventId nullable...",
      );

      // Disable foreign keys temporarily
      await db.execute("PRAGMA foreign_keys=OFF");

      // Create new table
      await db.execute(`
        CREATE TABLE __new_hackathon (
          id text PRIMARY KEY NOT NULL,
          event_id text,
          user_id text NOT NULL,
          team_name text NOT NULL,
          team_leader_name text NOT NULL,
          team_leader_email text NOT NULL,
          team_leader_phone text NOT NULL,
          team_leader_gender text NOT NULL,
          institute text NOT NULL,
          branch text NOT NULL,
          year text NOT NULL,
          team_members text,
          payment_screenshot text,
          transaction_id text,
          declaration_accepted integer NOT NULL,
          status text DEFAULT 'pending' NOT NULL,
          created_at integer NOT NULL,
          updated_at integer NOT NULL,
          FOREIGN KEY (user_id) REFERENCES user(id) ON UPDATE no action ON DELETE cascade
        )
      `);

      // Check if there's data to copy
      const result = await db.execute(
        "SELECT COUNT(*) as count FROM hackathon",
      );
      const count = result.rows[0].count;

      if (count > 0) {
        // Copy data
        await db.execute(`
          INSERT INTO __new_hackathon 
          SELECT id, event_id, user_id, team_name, team_leader_name, team_leader_email, 
                 team_leader_phone, team_leader_gender, institute, branch, year, team_members, 
                 payment_screenshot, transaction_id, declaration_accepted, status, created_at, updated_at 
          FROM hackathon
        `);
        console.log(`Copied ${count} existing registrations`);
      } else {
        console.log("No existing data to copy");
      }

      // Drop old table
      await db.execute("DROP TABLE hackathon");

      // Rename new table
      await db.execute("ALTER TABLE __new_hackathon RENAME TO hackathon");

      // Re-enable foreign keys
      await db.execute("PRAGMA foreign_keys=ON");

      // Create unique index
      await db.execute(
        "CREATE UNIQUE INDEX hackathon_team_name_unique ON hackathon (team_name)",
      );

      console.log("✅ Migration applied successfully!");
    }

    console.log(
      "The eventId field is now nullable and registrations can proceed.",
    );
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

fixHackathonEventId()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
