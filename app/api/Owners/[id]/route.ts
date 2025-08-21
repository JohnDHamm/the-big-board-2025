import { NextRequest, NextResponse } from "next/server";
import Owner from "@/app/(models)/Owner";

export async function GET( res: NextRequest, { params }: { params: { id: string }} ) {
  try {
    const { id } = await params;
    const owners = await Owner.find({leagueId: id}, "name leagueId isCommish");
    return NextResponse.json(owners, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
