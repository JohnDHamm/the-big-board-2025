import { NextResponse } from "next/server";
import League from "@/app/(models)/League";

export async function GET() {
  try {
    const leaguesList = await League.find({}, "_id name");
    return NextResponse.json({ leaguesList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
