import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { event } from "@/database/schema";

// Backup database credentials
const BACKUP_DB_URL = "libsql://ei-copy-25-10-2025-rolex.aws-ap-south-1.turso.io";
const BACKUP_DB_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicm8iLCJleHAiOjE3NzI0Mjk1MTgsImlhdCI6MTc3MjM0MzExOCwiaWQiOiIwOTU1ZGIwMC05MDU5LTRjYTctYTdkNS02Y2FhMGI3MTNlZTMiLCJyaWQiOiIwZTZiOTNhNy0zOGNjLTQ3YjUtYTZhNy01ZTNkZGQ3MTFlM2EifQ.MyY8TsX6OzDmddi_OEZ05z0atlh9m5OOYoduM2lAr6SxVhlaV3nBNo1GU2H_oML9vYph2cvd3hnfHhgQ6sVzAg";

// Load environment variables for main database
config({ path: "./.env.local" });

async function restoreEventsFromBackup() {
  try {
    console.log("🔄 Connecting to backup database...");
    
    // Connect to backup database
    const backupClient = createClient({
      url: BACKUP_DB_URL,
      authToken: BACKUP_DB_TOKEN,
    });
    const backupDb = drizzle(backupClient);
    
    // Get events from backup database
    const backupEvents = await backupDb.select().from(event);
    console.log(`📦 Found ${backupEvents.length} events in backup database`);
    
    // Connect to main database
    console.log("🔄 Connecting to main database...");
    const mainClient = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    const mainDb = drizzle(mainClient);
    
    // Get current events in main database to avoid duplicates
    const currentEvents = await mainDb.select().from(event);
    const currentEventNames = new Set(currentEvents.map(e => e.name));
    
    console.log(`📊 Current events in main database: ${currentEvents.length}`);
    
    // Insert only events that don't already exist
    let restoredCount = 0;
    for (const backupEvent of backupEvents) {
      if (!currentEventNames.has(backupEvent.name)) {
        // Create a new ID for the event in main database
        const eventToInsert = {
          ...backupEvent,
          id: crypto.randomUUID(), // Generate new ID to avoid conflicts
        };
        
        await mainDb.insert(event).values(eventToInsert);
        console.log(`✅ Restored event: ${backupEvent.name}`);
        restoredCount++;
      } else {
        console.log(`⏭️  Skipped duplicate event: ${backupEvent.name}`);
      }
    }
    
    console.log(`🎉 Successfully restored ${restoredCount} events!`);
    
    // Close connections
    backupClient.close();
    mainClient.close();
    
  } catch (error) {
    console.error("❌ Error restoring events:", error);
  }
}

restoreEventsFromBackup();
