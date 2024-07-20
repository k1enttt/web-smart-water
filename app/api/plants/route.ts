"use server";
import { plantsRef } from "@/lib/firebase";
import { connectToMongoDB } from "@/lib/mongo";
import { PlantSchema } from "@/schemas";
import { push, update } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  let plantList = [];
  // Có Mongo Client
  const client = await connectToMongoDB();
  if (!client) return NextResponse.json({ status: 500, body: {} });

  // Lấy danh sách cây từ MongoDB
  try {
    plantList = await client.db("smartwater").collection("plants").find({}).toArray();
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  if (!plantList) return NextResponse.json({ status: 404, body: {} });
  return NextResponse.json({ status: 200, body: plantList });
};

// export const POST = async (req: NextRequest) => {
//   const request = await req.json();
//   try {
//     const newPlant: PlantSchema = {
//       id: Date.now().toString(),
//       ...request,
//     };
//     const newLogKey = push(plantsRef).key;

//     const updates: {
//       [key: string]: PlantSchema;
//     } = {};
//     updates["/" + newLogKey] = newPlant;

//     await update(plantsRef, updates);

//     return NextResponse.json({ status: 200, body: newPlant });
//   } catch (error) {
//     return NextResponse.json({ status: 500, body: error });
//   }
// };
