// app/api/feedback/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";

// Initialize Supabase client (use your own project URL & anon key)
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // 1. Check if user already gave feedback in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // const { data: existingFeedback, error: checkError } = await supabase
    //   .from("feedbacks")
    //   .select("feedback_id")
    //   .eq("email", email)
    //   .gte("feedback_created_at", thirtyDaysAgo.toISOString());

    // if (checkError) {
    //   return NextResponse.json(
    //     { error: "Error checking existing feedback." },
    //     { status: 400 },
    //   );
    // }

    // if (existingFeedback && existingFeedback.length > 0) {
    //   // Already submitted in last 30 days
    //   return NextResponse.json(
    //     { error: "You can only submit feedback once per month." },
    //     { status: 400 },
    //   );
    // }

    // 2. Insert new feedback
    const { data, error: insertError } = await supabase
      .from("feedbacks")
      .insert({
        name,
        email,
        message,
      })
      .select(); // returns the inserted row

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    // Success
    return NextResponse.json({
      success: true,
      message: "Your feedback has been submitted successfully!",
      inserted: data,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
