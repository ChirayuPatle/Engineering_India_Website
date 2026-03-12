import { seedEvents } from '../src/database/seed-events.js';

seedEvents().then(result => {
  console.log('Seed result:', result);
  process.exit(0);
}).catch(error => {
  console.error('Seed error:', error);
  process.exit(1);
});
