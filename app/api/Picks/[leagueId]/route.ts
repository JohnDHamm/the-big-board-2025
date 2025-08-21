import { NextRequest, NextResponse } from "next/server";
import Pick from "@/app/(models)/Pick";

export async function GET( res: NextRequest, { params }: { params: { leagueId: string }} ) {
  try {
    const { leagueId } = await params;
    const owners = await Pick.find({leagueId: leagueId}, "selectionNumber ownerId playerId");
    return NextResponse.json(owners, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
