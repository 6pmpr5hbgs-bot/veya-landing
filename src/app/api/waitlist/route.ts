import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email =
    body && typeof body === "object" && "email" in body
      ? String((body as Record<string, unknown>).email).toLowerCase().trim()
      : "";

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project-id")) {
    // Dev mode — Supabase not yet configured
    console.log("[waitlist] ⚠ Supabase not configured. Would have stored:", email);
    return NextResponse.json({ success: true });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase
    .from("waitlist")
    .insert({ email, created_at: new Date().toISOString() });

  if (error) {
    // 23505 = unique_violation — email already registered, treat as success
    if (error.code === "23505") {
      return NextResponse.json({ success: true });
    }
    console.error("[waitlist] Supabase error:", error.message, error.code);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
