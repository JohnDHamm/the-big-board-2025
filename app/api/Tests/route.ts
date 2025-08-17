import { NextRequest, NextResponse } from "next/server";
import Test from "@/app/(models)/Test";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("body", body)
    await Test.create(body);
    return NextResponse.json({ message: "Message created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
