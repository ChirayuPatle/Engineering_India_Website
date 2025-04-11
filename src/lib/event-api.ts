// lib/api.ts
import { toast } from "sonner";

/**
 * Creates a new event by sending formData to the server
 */
export async function createEvent(formData: FormData) {
  // try {
  //   const response = await fetch("/api/events", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   if (!response.ok) {
  //     const error = await response.json();
  //     throw new Error(error.message || "Failed to create event");
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error creating event:", error);
  //   throw error;
  // }
}

/**
 * Fetches all events
 */
export async function getEvents() {
  // try {
  //   const response = await fetch("/api/events");
  //   if (!response.ok) {
  //     const error = await response.json();
  //     throw new Error(error.message || "Failed to fetch events");
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error fetching events:", error);
  //   throw error;
  // }
}

/**
 * Fetches a single event by ID
 */
export async function getEvent(id: string) {
  // try {
  //   const response = await fetch(`/api/events/${id}`);
  //   if (!response.ok) {
  //     const error = await response.json();
  //     throw new Error(error.message || "Failed to fetch event");
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error(`Error fetching event ${id}:`, error);
  //   throw error;
  // }
}

/**
 * Publishes the registration form for an event
 */
export async function publishEvent(id: string) {
  // try {
  //   const response = await fetch(`/api/events/${id}/publish`, {
  //     method: "POST",
  //   });
  //   if (!response.ok) {
  //     const error = await response.json();
  //     throw new Error(error.message || "Failed to publish event");
  //   }
  //   return await response.json();
  // } catch (error) {
  //   console.error(`Error publishing event ${id}:`, error);
  //   throw error;
  // }
}
