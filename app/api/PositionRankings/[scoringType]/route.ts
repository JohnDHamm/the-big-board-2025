import { NextRequest, NextResponse } from "next/server";
import PositionRanking from "@/app/(models)/PositionRanking";

export async function GET ( req: NextRequest, { params }: { params: { scoringType: ScoringType}}) {
  try {
    const { scoringType } = await params;
    const positionRankings = await PositionRanking.find({scoringType: scoringType});
    return NextResponse.json(positionRankings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
