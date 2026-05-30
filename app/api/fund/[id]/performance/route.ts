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
      "SELECT year, value FROM fund_performance WHERE fund_id = $1 ORDER BY year ASC",
      [params.id]
    );

    return NextResponse.json({ performance: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Fetch performance error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}