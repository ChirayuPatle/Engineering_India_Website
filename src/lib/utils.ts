// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Processes form data from FormData object to a regular object
 */
export function processFormData(formData: FormData) {
  const data: Record<string, any> = {};

  formData.forEach((value, key) => {
    // Skip files, they will be handled separately
    if (value instanceof File) {
      if (value.size > 0) {
        data[key] = value;
      }
      return;
    }

    // Try to parse JSON values
    if (typeof value === "string") {
      try {
        data[key] = JSON.parse(value);
      } catch (e) {
        // If not JSON, store as is
        data[key] = value;
      }
    } else {
      data[key] = value;
    }
  });

  return data;
}

/**
 * Formats a date string to a human-readable format
 */
export function formatDate(dateString: string | number | Date): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Validates if a date is in the past
 */
export function isPastDate(dateString: string | number | Date): boolean {
  const date = new Date(dateString);
  return date < new Date();
}

/**
 * Creates a slug from a string (for URL friendly paths)
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
