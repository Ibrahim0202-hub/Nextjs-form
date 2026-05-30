import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/mydb";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const result = await pool.query(
      "SELECT * FROM funds WHERE id = $1",
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Fund not found" }, { status: 404 });
    }

    return NextResponse.json({ fund: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Fetch fund error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}