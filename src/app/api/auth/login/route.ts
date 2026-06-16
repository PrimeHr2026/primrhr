import { NextResponse } from "next/server";
import { verifyPassword, setSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }
  if (!verifyPassword(email, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await setSession(email);
  return NextResponse.json({ ok: true });
}
