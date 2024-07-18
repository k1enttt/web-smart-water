"use server";
import { plantsRef } from "@/lib/firebase";
import { PlantSchema } from "@/schemas";
import { get, push, update } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  let plants = {};
  try {
    plants = await get(plantsRef).then((snapshot) => snapshot.val());
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  if (!plants) return NextResponse.json({ status: 404, body: {} });
  return NextResponse.json({ status: 200, body: plants });
};

export const POST = async (req: NextRequest) => {
  const request = await req.json();
  try {
    const newPlant: PlantSchema = {
      id: Date.now().toString(),
      ...request,
    };
    const newLogKey = push(plantsRef).key;

    const updates: {
      [key: string]: PlantSchema;
    } = {};
    updates["/" + newLogKey] = newPlant;

    await update(plantsRef, updates);

    return NextResponse.json({ status: 200, body: newPlant });
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
};
