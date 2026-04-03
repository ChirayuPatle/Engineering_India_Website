// Test script to verify gallery data format

// Test 1: Simple string array (old format)
const oldFormat = '["image1.jpg", "image2.jpg", "image3.jpg"]';
const normalizedOld = normalizeGalleryData(oldFormat);
console.log("Old format -> Normalized:", normalizedOld);

// Test 2: Object array (new format)
const newFormat = '[{"src": "image1.jpg", "alt": "Description 1"}, {"src": "image2.jpg", "alt": "Description 2"}]';
const normalizedNew = normalizeGalleryData(newFormat);
console.log("New format -> Normalized:", normalizedNew);

// Helper function from admin page
function normalizeGalleryData(gallery) {
  if (!gallery) return "[]";
  try {
    const parsed = JSON.parse(gallery);
    // If it's a simple array of strings, convert to objects
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
      return JSON.stringify(parsed.map((src, index) => ({
        src,
        alt: `Gallery image ${index + 1}`
      })));
    }
    // If it's already in correct format, return as is
    return gallery;
  } catch (e) {
    return "[]";
  }
}
