const { db } = require("./src/database/db.js");
const { event } = require("./src/database/schema/event-schema.js");

async function checkEvents() {
  try {
    const events = await db.select().from(event);
    console.log("Current events in database:");
    events.forEach((evt, index) => {
      console.log(`${index + 1}. ${evt.name} (ID: ${evt.id})`);
    });
    console.log(`Total events: ${events.length}`);
  } catch (error) {
    console.error("Error checking events:", error);
  }
}

checkEvents();
