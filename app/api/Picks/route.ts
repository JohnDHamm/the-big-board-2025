import { NextRequest, NextResponse } from "next/server";
import Pick from "@/app/(models)/Pick";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await Pick.create(body);
    
    return NextResponse.json({ message: "Item created", received: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
