import { NextResponse } from "next/server";
import pool from "@/lib/mydb";
import { requireAuth } from "@/lib/requireAuth";

// GET /api/fund — fetch all fund data (protected)
export async function GET() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const result = await pool.query(
      `SELECT 
        id,
        fund_name,
        category,
        amount,
        returns_percent,
        risk_level,
        description,
        created_at
       FROM funds
       ORDER BY created_at DESC`
    );

    return NextResponse.json({ funds: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Fetch funds error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}