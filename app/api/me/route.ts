import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "@/lib/session";

export async function GET() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      userId: session.userId,
      name: session.name,
      email: session.email,
    },
  });
}