import { NextResponse } from "next/server";
import Team from "@/app/(models)/Team"

export async function GET () {
  try {
    const teams = await Team.find();
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
