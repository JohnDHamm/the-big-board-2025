import { NextResponse } from "next/server";
import League from "@/app/(models)/League";

export async function GET() {
  try {
    const leagues = await League.find();
    return NextResponse.json({ leagues }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
