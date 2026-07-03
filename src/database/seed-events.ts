import { config } from "dotenv";
import { db } from "@/database/db";
import { event } from "@/database/schema";
import { v4 as uuidv4 } from "uuid";

// Load environment variables
config({ path: "./.env.local" });

const eventsData = [
  {
    name: "PRARAMBH 1.0 Hackathon",
    description:
      "A technical challenge to solve real-world problems in Ed-Tech, Smart Environment, AI & Web3, FinTech, and Social Innovation.",
    startDate: "2025-11-01T09:00:00Z",
    endDate: "2025-11-01T18:00:00Z",
    timeline: "9:00 AM to 6:00 PM onwards",
    prizes:
      '["₹6,000 + T-shirts/Stickers (1st)", "₹4,000 + Caps (2nd)", "₹3,000 (3rd)", "Internship opportunities at Vectorteklabs"]',
    faqs: "[]",
    organizerContact: "Priyanshu Kayarkar (+91 9373690752)",
    coOrganizerContact: "Muchkundraj Thote (+91 90968 30986)",
    bannerImage: "/image/magazine/1.png",
    gallery: '["Hackathon_working_session_1", "Hackathon_working_session_2"]',
    details:
      "Organized in collaboration with ACM, CSE Department. Features tracks like AI & Web3 and Open Innovation.",
    rules: "Team size max 4 members. Registration fee ₹300 per team.",
    location: "IT Department, YCCE Campus",
    category: "Technical/Hackathon",
  },
  {
    name: "StartupWave Ideathon",
    description:
      "A platform for young innovators to pitch creative and feasible startup ideas and overcome stage fear.",
    startDate: "2025-11-01T11:00:00Z",
    endDate: "2025-11-01T16:00:00Z",
    timeline: "Starts at 11:00 AM",
    prizes:
      '["Total Prize Pool: ₹10,000", "Goodies", "Internship Opportunities"]',
    faqs: "[]",
    organizerContact: "Samyak Umathe (9146655108)",
    coOrganizerContact: "Ishika Lanjewar (7498682969)",
    bannerImage: "/image/magazine/2.png",
    gallery: '["Ideathon_Presentation_Session"]',
    details:
      "Conducted in collaboration with GFG, GHRCOEM. Judged by industry founders from HiTech Pathshala and Bizleap.",
    rules: "Team size max 6 members. Entry fee ₹269 per team.",
    location: "CSE Department, YCCE Campus",
    category: "Entrepreneurship/Ideathon",
  },
  {
    name: "PRARAMBH 1.0 Treasure Hunt",
    description:
      "An intellectually stimulating campus-wide hunt involving 3 rounds of decoding complex clues and challenges.",
    startDate: "2025-11-01T12:30:00Z",
    endDate: "2025-11-01T16:30:00Z",
    timeline: "12:30 PM to 4:30 PM",
    prizes: '["Winner Cash Prize: ₹2,500"]',
    faqs: "[]",
    organizerContact: "Parth Dehare (+91 82638 43834)",
    coOrganizerContact: "Payal Dongare (+91 80031 70927)",
    bannerImage: "/image/magazine/3.png",
    gallery: '["Treasure_Hunt_Activity_1"]',
    details:
      "Tests logical reasoning, teamwork, and presence of mind. More than 350 participants.",
    rules: "Team size 3-5 members. Entry fee ₹250 per team.",
    location: "CT Department/Campus, YCCE",
    category: "Non-Technical/Fun",
  },
  {
    name: "AI & Automation Seminar",
    description:
      "Keynote session on Agentic AI, Generative AI, and Intelligent Automation with practical demonstrations.",
    startDate: "2025-11-01T12:00:00Z",
    endDate: "2025-11-01T14:30:00Z",
    timeline: "12:00 PM Onwards",
    prizes: '["Cash prizes for quiz winners", "Goodies"]',
    faqs: "[]",
    organizerContact: "Mansi Jalandhar (72489 78718)",
    coOrganizerContact: "Khushi Choudhari (89998 80488)",
    bannerImage: "/image/magazine/4.png",
    gallery: '["Seminar_Auditorium_View"]',
    details:
      "Speaker: Mr. Neeraj Thosar (MSc CS, Univ. of Nottingham). Hands-on with Azure AI and Python frameworks.",
    rules: "Individual entry fee: ₹60.",
    location: "Old CCC Seminar Hall, YCCE",
    category: "Educational/Workshop",
  },
  {
    name: "ABHYUDAYA 25.0 Hackathon",
    description:
      "Central India's biggest hackathon held at IIIT Nagpur to foster innovation and practical IT skills.",
    startDate: "2026-02-01T07:00:00Z",
    endDate: "2026-02-01T18:00:00Z",
    timeline: "7:00 AM to 6:00 PM",
    prizes: '["Prize Pool: ₹21,000", "Industry Verified Certificates"]',
    faqs: "[]",
    organizerContact: "Yashpal Chandewar (7821903083)",
    coOrganizerContact: "Priyanshu Kayarkar (7559425066)",
    bannerImage: "/image/magazine/5.png",
    gallery: '["IIITN_Hackathon_Floor"]',
    details:
      "Part of Abhyudaya 25.0. 600+ participants. Evaluated by alumni and HCL members.",
    rules: "Team size 3-5. Entry fee ₹500 (includes lunch).",
    location: "Indian Institute of Information Technology (IIITN), Nagpur",
    category: "Technical/Hackathon",
  },
  {
    name: "Donation Drive",
    description:
      "Social initiative to support underprivileged children from orphanages and blind schools.",
    startDate: "2026-01-15T13:57:00Z",
    endDate: "2026-01-15T17:00:00Z",
    timeline: "1:57 PM Onwards",
    prizes: '["Certificate of Social Service"]',
    faqs: "[]",
    organizerContact: "Samyak Umathe",
    coOrganizerContact: "Anushka",
    bannerImage: "/image/magazine/6.png",
    gallery: '["Donation_Drive_Group_Photo"]',
    details:
      "Collecting stationary, toys, and clothes. Introduction to 'Be My App' for visually impaired children.",
    rules: "Open for all students and volunteers.",
    location: "Deekshabhoomi / YCCE Campus, Nagpur",
    category: "Social Service",
  },
];

export async function seedEvents() {
  try {
    console.log("🌱 Starting to seed events...");

    // Insert events with proper data types (without clearing existing ones)
    for (const eventData of eventsData) {
      const eventRecord = {
        id: uuidv4(),
        name: eventData.name,
        description: eventData.description || null,
        startDate: new Date(eventData.startDate),
        endDate: new Date(eventData.endDate),
        timeline: eventData.timeline || null,
        prizes: eventData.prizes || null,
        faqs: eventData.faqs || null,
        organizerContact: eventData.organizerContact || null,
        coOrganizerContact: eventData.coOrganizerContact || null,
        bannerImage: eventData.bannerImage || null,
        gallery: eventData.gallery || null,
        details: eventData.details || null,
        rules: eventData.rules || null,
        location: eventData.location || null,
        category: eventData.category || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.insert(event).values(eventRecord);
      console.log(`✅ Seeded event: ${eventData.name}`);
    }

    console.log(`🎉 Successfully seeded ${eventsData.length} events!`);
    return { success: true, count: eventsData.length };
  } catch (error) {
    console.error("❌ Error seeding events:", error);
    return { success: false, error: String(error) };
  }
}

// Run if this file is executed directly
if (
  import.meta.url === `file://${process.argv[1]}` ||
  import.meta.url.includes(process.argv[1]?.replace(/\\/g, "/") ?? "")
) {
  seedEvents();
}
