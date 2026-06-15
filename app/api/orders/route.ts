import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/mydb";
import { requireAuth } from "@/lib/requireAuth";
import { SessionData } from "@/lib/session";

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  const session = auth as SessionData;

  try {
    const { fund_id, amount, frequency } = await req.json();

    await pool.query(
      "INSERT INTO orders (user_email, fund_id, amount, frequency) VALUES ($1, $2, $3, $4)",
      [session.email, fund_id, amount, frequency]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}