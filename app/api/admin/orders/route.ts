import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/mydb";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    return NextResponse.json({ orders: result.rows });
  } catch (err) {
    console.error("Admin orders error:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id, status } = await req.json();
    await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2",
      [status, id]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update order error:", err);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}