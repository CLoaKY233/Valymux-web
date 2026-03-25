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

  const story = sanitize(raw.story, 3000);
  if (!story) {
    return NextResponse.json({ error: "Please share your story." }, { status: 400 });
  }

  const name = sanitize(raw.name, 100);
  const role = sanitize(raw.role, 100);
  const company = sanitize(raw.company, 100);
  const ideal_solution = sanitize(raw.ideal_solution, 2000);

  const rawEmail = sanitize(raw.email, 254);
  const email = rawEmail && EMAIL_RE.test(rawEmail) ? rawEmail : "";

  const db = await getDb().catch(() => null);
  if (!db) {
    return NextResponse.json({ error: "Service unavailable. Please try again." }, { status: 503 });
  }

  try {
    await db.create(new Table("feedback")).content({ name, email, role, company, story, ideal_solution, created_at: new Date() });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
  } finally {
    await db.close();
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
