/**
 * Google Sheets Integration for Hackathon Registrations
 *
 * This utility sends registration data to Google Sheets via Google Apps Script Web App
 */

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  gender: string;
  branch: string;
  year: string;
}

interface HackathonRegistrationData {
  registrationId: string;
  teamName: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  teamLeaderPhone: string;
  teamLeaderGender: string;
  institute: string;
  branch: string;
  year: string;
  teamMembers: TeamMember[];
  transactionId?: string | null;
  paymentScreenshotUrl: string;
  status: string;
  registeredAt: Date;
}

/**
 * Sends hackathon registration data to Google Sheets
 * @param data - The registration data to send
 * @returns Promise with success status
 */
export async function syncToGoogleSheets(
  data: HackathonRegistrationData,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get Google Apps Script Web App URL from environment variable
    const googleSheetsWebAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

    if (!googleSheetsWebAppUrl) {
      console.warn("Google Sheets Web App URL not configured. Skipping sync.");
      return { success: false, error: "Google Sheets URL not configured" };
    }

    // Prepare data for Google Sheets
    const sheetData = {
      registrationId: data.registrationId,
      timestamp: data.registeredAt.toISOString(),
      teamName: data.teamName,

      // Team Leader Info
      leaderName: data.teamLeaderName,
      leaderEmail: data.teamLeaderEmail,
      leaderPhone: data.teamLeaderPhone,
      leaderGender: data.teamLeaderGender,

      // Institute Info
      institute: data.institute,
      branch: data.branch,
      year: data.year,

      // Team Size
      teamSize: data.teamMembers.length + 1,

      // Team Members (formatted as JSON string or separate columns)
      member1Name: data.teamMembers[0]?.name || "",
      member1Email: data.teamMembers[0]?.email || "",
      member1Phone: data.teamMembers[0]?.phone || "",
      member1Gender: data.teamMembers[0]?.gender || "",
      member1Branch: data.teamMembers[0]?.branch || "",
      member1Year: data.teamMembers[0]?.year || "",

      member2Name: data.teamMembers[1]?.name || "",
      member2Email: data.teamMembers[1]?.email || "",
      member2Phone: data.teamMembers[1]?.phone || "",
      member2Gender: data.teamMembers[1]?.gender || "",
      member2Branch: data.teamMembers[1]?.branch || "",
      member2Year: data.teamMembers[1]?.year || "",

      member3Name: data.teamMembers[2]?.name || "",
      member3Email: data.teamMembers[2]?.email || "",
      member3Phone: data.teamMembers[2]?.phone || "",
      member3Gender: data.teamMembers[2]?.gender || "",
      member3Branch: data.teamMembers[2]?.branch || "",
      member3Year: data.teamMembers[2]?.year || "",

      // Payment Info
      transactionId: data.transactionId || "N/A",
      paymentScreenshotUrl: data.paymentScreenshotUrl,

      // Status
      status: data.status,
    };

    // Send POST request to Google Apps Script Web App
    const response = await fetch(googleSheetsWebAppUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheets sync failed:", errorText);
      return {
        success: false,
        error: `HTTP ${response.status}: ${errorText}`,
      };
    }

    const result = await response.json();
    console.log("Google Sheets sync successful:", result);

    return { success: true };
  } catch (error) {
    console.error("Error syncing to Google Sheets:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
