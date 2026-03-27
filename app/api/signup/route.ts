import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("Received from frontend:", data);

  return NextResponse.json({ message: "Success" });
}