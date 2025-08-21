import { NextRequest, NextResponse } from "next/server";
import OverallRanking from "@/app/(models)/OverallRanking";

export async function GET ( req: NextRequest, { params }: { params: { scoringType: ScoringType}}) {
  try {
    const { scoringType } = await params;
    const overallRankings = await OverallRanking.find({scoringType: scoringType});
    return NextResponse.json(overallRankings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
