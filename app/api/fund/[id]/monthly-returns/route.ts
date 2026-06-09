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
      "SELECT year, month, return_value FROM fund_monthly_returns WHERE fund_id = $1 ORDER BY year DESC, month ASC",
      [params.id]
    );
    return NextResponse.json({ monthly_returns: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Fetch monthly returns error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}