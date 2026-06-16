import { NextResponse } from "next/server";
import { getDb, isDbConfigured, type ApplicationDoc } from "@/lib/mongodb";
import { isAuthed } from "@/lib/auth";

const COLLECTION = "applications";

function clamp(s: unknown, max: number): string {
  return String(s ?? "").slice(0, max).trim();
}

// Admin-only listing.
export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json([]);
  try {
    const db = await getDb();
    const docs = await db
      .collection<ApplicationDoc>(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();
    return NextResponse.json(
      docs.map((d) => ({
        id: String(d._id),
        name: d.name,
        email: d.email,
        phone: d.phone,
        company: d.company,
        service: d.service,
        participants: d.participants,
        format: d.format,
        timeline: d.timeline,
        message: d.message,
        status: d.status,
        createdAt: d.createdAt,
      })),
    );
  } catch {
    return NextResponse.json([]);
  }
}

// Public submission.
export async function POST(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Applications are not available yet." }, { status: 503 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clamp(body.name, 120);
  const email = clamp(body.email, 160);
  const phone = clamp(body.phone, 40);
  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Name, email and phone are required." }, { status: 400 });
  }

  const doc: ApplicationDoc = {
    name,
    email,
    phone,
    service: clamp(body.service, 140) || "General enquiry",
    company: clamp(body.company, 160) || undefined,
    participants: clamp(body.participants, 40) || undefined,
    format: clamp(body.format, 60) || undefined,
    timeline: clamp(body.timeline, 120) || undefined,
    message: clamp(body.message, 3000) || undefined,
    status: "new",
    createdAt: new Date(),
  };

  try {
    const db = await getDb();
    const res = await db.collection<ApplicationDoc>(COLLECTION).insertOne(doc);
    return NextResponse.json({ id: String(res.insertedId) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not submit your application." }, { status: 500 });
  }
}
