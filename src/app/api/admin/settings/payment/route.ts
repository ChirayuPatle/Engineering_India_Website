import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";

// In a real app, you would store this in a database
// For now, we'll use a simple in-memory store
let paymentSettings = {
  qrCodeUrl: null,
  upiIds: [],
  instructions: "",
  bankDetails: null,
  enabled: true,
};

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 },
      );
    }

    return NextResponse.json({
      success: true,
      settings: paymentSettings,
    });
  } catch (error) {
    console.error("Error fetching payment settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 },
      );
    }

    const body = await req.json();

    // Update settings
    paymentSettings = {
      qrCodeUrl: body.qrCodeUrl || null,
      upiIds: body.upiIds || [],
      instructions: body.instructions || "",
      bankDetails: body.bankDetails || null,
      enabled: body.enabled !== undefined ? body.enabled : true,
    };

    return NextResponse.json({
      success: true,
      settings: paymentSettings,
    });
  } catch (error) {
    console.error("Error saving payment settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
