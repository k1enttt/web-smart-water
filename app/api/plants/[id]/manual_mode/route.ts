import { NextRequest, NextResponse } from "next/server";
import { child, get, set, update } from "firebase/database";
import { plantsRef } from "@/lib/firebase";

export async function GET(req: NextRequest) {
  const id = req.url.split("plants/")[1].split("/manual_mode")[0];
  let response = {};

  try {
    response = await get(child(plantsRef, `/${id}/manual_mode`));
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  if (!response) return NextResponse.json({ status: 404, body: {} });
  return NextResponse.json({ status: 200, body: response });
}

/** Handle a PUT resquest to modify the attribute*/
export async function POST(req: NextRequest) {
  // Get the plant id from the request
  const id = req.url.split("plants/")[1].split("/manual_mode")[0];
  const payload = await req.json();
  const { manual_mode } = payload;

  if (manual_mode && typeof manual_mode !== "number") {
    return NextResponse.json({
      status: 400,
      body: { error: "Invalid manual mode: " },
    });
  }

  try {
    await set(child(plantsRef, `/${id}/manual_mode`), manual_mode);
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  return NextResponse.json({ status: 200, body: payload });
}

export async function PUT(req: NextRequest) {
  // Get the plant id from the request
  const id = req.url.split("plants/")[1].split("/manual_mode")[0];
  const payload = await req.json();
  const { server } = payload;
  console.log(server);

  if (typeof server !== "number") {
      return NextResponse.json({
        status: 400,
        body: { error: server + " is an invalid value" },
      });
  }

  try {
    await update(child(plantsRef, `/${id}/manual_mode`), { server: server });
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  return NextResponse.json({ status: 200, body: payload });
}
