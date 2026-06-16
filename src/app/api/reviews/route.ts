import { NextResponse } from "next/server";
import { getDb, isDbConfigured, type ReviewDoc } from "@/lib/mongodb";
import { isAuthed } from "@/lib/auth";

const COLLECTION = "reviews";

function clamp(s: unknown, max: number): string {
  return String(s ?? "").slice(0, max).trim();
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const approvedOnly = searchParams.get("approved") === "1";

  if (!isDbConfigured()) return NextResponse.json([]);

  try {
    const db = await getDb();
    const authed = await isAuthed();
    const filter = approvedOnly || !authed ? { approved: true } : {};
    const docs = await db
      .collection<ReviewDoc>(COLLECTION)
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    return NextResponse.json(
      docs.map((d) => ({
        id: String(d._id),
        name: d.name,
        position: d.position,
        company: d.company,
        rating: d.rating,
        review: d.review,
        approved: d.approved,
        createdAt: d.createdAt,
      })),
    );
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Reviews are not available yet." }, { status: 503 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clamp(body.name, 120);
  const review = clamp(body.review, 2000);
  const rating = Math.max(1, Math.min(5, Number(body.rating) || 0));
  if (!name || !review || !rating) {
    return NextResponse.json({ error: "Name, rating and review are required." }, { status: 400 });
  }

  const doc: ReviewDoc = {
    name,
    position: clamp(body.position, 120) || undefined,
    company: clamp(body.company, 120) || undefined,
    rating,
    review,
    approved: false,
    createdAt: new Date(),
  };

  try {
    const db = await getDb();
    const res = await db.collection<ReviewDoc>(COLLECTION).insertOne(doc);
    return NextResponse.json({ id: String(res.insertedId) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save your review." }, { status: 500 });
  }
}
