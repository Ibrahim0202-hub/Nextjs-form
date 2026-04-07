import { NextResponse } from "next/server";
import { pool } from "@/lib/mydb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // ✅ Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email & Password required" },
        { status: 400 }
      );
    }

    // 🔍 Find user by email
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const user = result.rows[0];

    // 🔐 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Success
    return NextResponse.json({
      success: true,
      message: "Login successful ✅",
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}