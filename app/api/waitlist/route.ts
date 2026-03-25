import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/surreal";
import { Table } from "surrealdb";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(val: unknown, maxLen: number): string {
  if (typeof val !== "string") return "";
  return val.trim().replace(/[<>]/g, "").slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  const email = sanitize(raw.email, 254);
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const name = sanitize(raw.name, 100) || undefined;
  const role = sanitize(raw.role, 100) || undefined;
  const message = sanitize(raw.message, 1000) || undefined;

  const db = await getDb().catch(() => null);
  if (!db) {
    return NextResponse.json({ error: "Service unavailable. Please try again." }, { status: 503 });
  }

  try {
    await db.create(new Table("waitlist")).content({ name, email, role, message });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
  } finally {
    try { await db.close(); } catch { /* ignore close errors */ }
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
