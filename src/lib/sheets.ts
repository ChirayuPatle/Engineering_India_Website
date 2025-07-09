import { google, type sheets_v4 } from "googleapis";
import { GoogleAuth } from "google-auth-library";

export async function getGoogleSheetsClient(): Promise<sheets_v4.Sheets> {
  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: authClient as any });

  return sheets;
}

export async function readSheet(sheets: sheets_v4.Sheets): Promise<any[][]> {
  const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;

  if (!sheetId) {
    throw new Error("Google Sheet ID not found in environment variables.");
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Sheet1",
  });

  return response.data.values || [];
}

export async function updateSheet(
  sheets: sheets_v4.Sheets,
  data: any[],
): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;

  if (!sheetId) {
    throw new Error("Google Sheet ID not found in environment variables.");
  }

  const existingData = await readSheet(sheets);
  const emailIndex = 4; // Assuming email is in the 5th column (index 4)
  const emailToFind = data[emailIndex];

  const isDuplicate = existingData.some(
    (row) => row[emailIndex] === emailToFind,
  );

  if (isDuplicate) {
    console.log("Duplicate entry found, skipping.");
    return;
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [data],
      },
    });
  } catch (error) {
    console.error("Detailed error from Google Sheets API:", error);
    throw error;
  }
}
