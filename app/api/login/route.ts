import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import pool from "@/lib/mydb";
import { sessionOptions, SessionData } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "SELECT id, first_name, last_name, email, password FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );
    session.userId = user.id;
    session.name = `${user.first_name} ${user.last_name}`;
    session.email = user.email;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json(
      { message: "Login successful", user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}