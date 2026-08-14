import { NextRequest, NextResponse } from "next/server";
import League from "@/app/(models)/League";

export async function GET( req: NextRequest, { params }: { params: { id: string }} ) {
  try {
    const { id } = await params;
    const league = await League.findById(id);
    return NextResponse.json(league, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PATCH( req: NextRequest, { params }: { params: { id: string }}) {
  try {
    const { id } = await params;
    const body = await req.json();

    await League.findByIdAndUpdate(id, body);
    return NextResponse.json({ message: "Item updated", received: body }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
