import { NextRequest, NextResponse } from "next/server";
import { child, get, set, update } from "firebase/database";
import { plantsRef } from "@/lib/db";

export async function GET(req: NextRequest) {
  const id = req.url.split("plants/")[1].split("/water_mode")[0];
  let response = {};

  try {
    response = await get(child(plantsRef, `/${id}/water_mode`));
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  if (!response) return NextResponse.json({ status: 404, body: {} });
  return NextResponse.json({ status: 200, body: response });
}

/** Handle a PUT resquest to modify the attribute*/
export async function POST(req: NextRequest) {
  // Get the plant id from the request
  const id = req.url.split("plants/")[1].split("/water_mode")[0];
  const payload = await req.json();
  const { water_mode } = payload;

  if (water_mode && typeof water_mode !== "number") {
    return NextResponse.json({
      status: 400,
      body: { error: "Invalid water mode: " },
    });
  }

  try {
    await set(child(plantsRef, `/${id}/water_mode`), water_mode);
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  return NextResponse.json({ status: 200, body: payload });
}
