import { db } from './src/database/db.ts';
import { event } from './src/database/schema/event-schema.ts';

async function checkEvents() {
  try {
    const events = await db.select().from(event);
    console.log('Current events in database:');
    events.forEach((evt, index) => {
      console.log(`${index + 1}. ${evt.name} (ID: ${evt.id})`);
    });
    console.log(`Total events: ${events.length}`);
    
    // Look for any hackathon events
    const hackathonEvents = events.filter(evt => 
      evt.name.toLowerCase().includes('hackathon') || 
      evt.category?.toLowerCase().includes('hackathon')
    );
    
    if (hackathonEvents.length > 0) {
      console.log('\nFound hackathon events:');
      hackathonEvents.forEach((evt, index) => {
        console.log(`${index + 1}. ${evt.name} (ID: ${evt.id})`);
      });
    }
  } catch (error) {
    console.error('Error checking events:', error);
  }
}

checkEvents();
