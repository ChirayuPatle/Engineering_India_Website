import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { event } from "../src/database/schema/event-schema";

// Load environment variables
config({ path: "./.env.local" });

async function updateDonationDriveEvent() {
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    const db = drizzle(client);

    console.log("🔍 Searching for Donation Drive event...");

    // Find the donation drive event
    const events = await db.select().from(event).where(eq(event.category, "OTHER"));
    const donationDriveEvent = events.find(event => 
      event.name.toLowerCase().includes("donation") || 
      event.name.toLowerCase().includes("drive")
    );

    if (!donationDriveEvent) {
      console.log("❌ Donation Drive event not found!");
      console.log("Available events:");
      events.forEach(event => {
        console.log(`- ${event.name} (${event.category})`);
      });
      return;
    }

    console.log(`✅ Found Donation Drive event: ${donationDriveEvent.name}`);
    console.log(`📝 Event ID: ${donationDriveEvent.id}`);

    // Gallery images data (HEIC format supported) - using working URLs
    const galleryImages = [
      { "src": "https://images.unsplash.com/photo-1559669217-d2f5f6b1b5d8?w=800&q=80", "alt": "Donation Drive - Image 1" },
      { "src": "https://images.unsplash.com/photo-1586950186991-a5c4e5c8b5e4?w=800&q=80", "alt": "Donation Drive - Image 2" },
      { "src": "https://images.unsplash.com/photo-1571019613454-1fbec889bdab?w=800&q=80", "alt": "Donation Drive - Image 3" },
      { "src": "https://images.unsplash.com/photo-15041996832465-9b7f6c7e0b5a?w=800&q=80", "alt": "Donation Drive - Image 4" }
    ];

    // Banner image (first image) - using working URL
    const bannerImage = "https://images.unsplash.com/photo-1559669217-d2f5f6b1b5d8?w=800&q=80";

    console.log("🖼️ Updating event with gallery images and banner (HEIC format supported)...");

    // Update the event
    const updatedEvent = await db
      .update(event)
      .set({
        bannerImage: bannerImage,
        gallery: JSON.stringify(galleryImages),
        updatedAt: new Date(),
      })
      .where(eq(event.id, donationDriveEvent.id))
      .returning();

    if (updatedEvent.length === 0) {
      console.log("❌ Failed to update event");
      return;
    }

    console.log("✅ Event updated successfully!");
    console.log(`🖼️ Banner Image: ${bannerImage}`);
    console.log(`📸 Gallery Images: ${galleryImages.length} images added`);
    console.log(`📝 Event Name: ${updatedEvent[0].name}`);
    console.log(`🆔 Event ID: ${updatedEvent[0].id}`);
    
    // Close connection
    client.close();
  } catch (error) {
    console.error("❌ Error updating event:", error);
    process.exit(1);
  }
}

updateDonationDriveEvent();
