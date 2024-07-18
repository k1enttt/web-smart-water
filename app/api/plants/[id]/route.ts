import { NextRequest, NextResponse } from "next/server";
import { child, get, set, update } from "firebase/database";
import { plantsRef } from "@/lib/firebase";

export const GET = async (req: NextRequest) => {
  const id = req.url.split("plants/")[1];
  let plant = {};
  try {
    plant = await get(child(plantsRef, `/${id}`));
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  if (!plant) return NextResponse.json({ status: 404, body: {} });
  return NextResponse.json({ status: 200, body: plant });
};

export const POST = async (req: NextRequest) => {
  const request = await req.json();
  const id = req.url.split("plants/")[1];
  try {
    await set(child(plantsRef, `/${id}`), request);
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  return NextResponse.json({ status: 200, body: request });
};

/** Handle a PUT resquest to modify the attribute*/
export async function PUT(req: NextRequest) {
  // Get the plant id from the request
  const id = req.url.split("plants/")[1];
  const payload = await req.json();

  /** If the payload have water_button_state variable, add it to an object, do the same thing with water_mode */
  const { water_mode } = payload;

  if (water_mode && typeof water_mode !== "number") {
    return NextResponse.json({
      status: 400,
      body: { error: "Invalid water mode" },
    });
  }

  try {
      await update(
        child(plantsRef, `/${id}`),
        {
          water_mode: water_mode, 
        }
      );
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  return NextResponse.json({ status: 200, body: payload });
}

/*
export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.url.split("plants/")[1];

    // Delete the plant in the firebase database

    return NextResponse.json({ status: 200, body: {} });
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
};*/
