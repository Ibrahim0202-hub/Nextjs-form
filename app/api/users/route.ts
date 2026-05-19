import { NextResponse } from "next/server";
import pool from "@/lib/mydb";
import bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/requireAuth";

// ✅ GET USERS (protected)
export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth instanceof NextResponse) return auth;

    const result = await pool.query(
      "SELECT id, first_name, last_name, email, country FROM users"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}

// ✅ SIGNUP
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, country } = body;

    if (!firstName || !email || !password) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, country)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, last_name, email, country`,
      [firstName, lastName, email, hashedPassword, country]
    );

    return NextResponse.json({
      success: true,
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// ✅ DELETE
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}