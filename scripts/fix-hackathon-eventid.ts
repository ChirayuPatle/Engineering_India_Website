import { db } from "@/database/db";
import { sql } from "drizzle-orm";

async function fixHackathonEventId() {
  try {
    console.log("Applying migration to make eventId nullable...");

    // Disable foreign keys temporarily
    await db.run(sql`PRAGMA foreign_keys=OFF`);

    // Create new table
    await db.run(sql`
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

    // Copy data
    await db.run(sql`
      INSERT INTO __new_hackathon 
      SELECT id, event_id, user_id, team_name, team_leader_name, team_leader_email, 
             team_leader_phone, team_leader_gender, institute, branch, year, team_members, 
             payment_screenshot, transaction_id, declaration_accepted, status, created_at, updated_at 
      FROM hackathon
    `);

    // Drop old table
    await db.run(sql`DROP TABLE hackathon`);

    // Rename new table
    await db.run(sql`ALTER TABLE __new_hackathon RENAME TO hackathon`);

    // Re-enable foreign keys
    await db.run(sql`PRAGMA foreign_keys=ON`);

    // Create unique index
    await db.run(
      sql`CREATE UNIQUE INDEX hackathon_team_name_unique ON hackathon (team_name)`,
    );

    console.log("Migration applied successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
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
