import { config } from "dotenv";
import { db } from "@/database/db";
import { event } from "@/database/schema";

// Load environment variables
config({ path: "./.env.local" });

async function checkEvents() {
  try {
    const events = await db.select().from(event);
    console.log("Current events in database:");
    events.forEach((e, i) => {
      console.log(`${i + 1}. ${e.name} - ${e.bannerImage}`);
    });
    console.log(`\nTotal events: ${events.length}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

checkEvents();
