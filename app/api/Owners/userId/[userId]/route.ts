import { NextRequest, NextResponse } from "next/server";
import Owner from "@/app/(models)/Owner";

export async function GET( res: NextRequest, { params }: { params: { userId: string }} ) {
  try {
    const { userId } = await params;
    const owners = await Owner.findOne({userId: userId}, "_id");
    return NextResponse.json(owners, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
