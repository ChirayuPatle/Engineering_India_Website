import { config } from "dotenv";
import { db } from "@/database/db";
import { event } from "@/database/schema";
import { eq } from "drizzle-orm";

// Load environment variables
config({ path: "./.env.local" });

async function cleanupDuplicates() {
  try {
    // Get all events and group by name
    const events = await db.select().from(event);
    const eventGroups = {};
    
    events.forEach(e => {
      if (!eventGroups[e.name]) {
        eventGroups[e.name] = [];
      }
      eventGroups[e.name].push(e);
    });

    // For each group, keep only the first one (most recent)
    for (const [name, eventList] of Object.entries(eventGroups)) {
      if (eventList.length > 1) {
        // Sort by createdAt descending and keep the first one
        eventList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const toKeep = eventList[0];
        const toDelete = eventList.slice(1);
        
        console.log(`Keeping ${name} (ID: ${toKeep.id}), deleting ${toDelete.length} duplicates`);
        
        // Delete duplicates
        for (const duplicate of toDelete) {
          await db.delete(event).where(eq(event.id, duplicate.id));
        }
      }
    }
    
    console.log("✅ Cleanup completed");
  } catch (error) {
    console.error("Error:", error);
  }
}

cleanupDuplicates();
