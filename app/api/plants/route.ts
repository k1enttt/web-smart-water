"use server";
// import { connectToMongoDB } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (req: NextRequest) => {
//   let plantList = [];
//   // Có Mongo Client
//   const client = await connectToMongoDB();
//   if (!client) return NextResponse.json({ status: 500, body: {} });

//   // Lấy danh sách cây từ MongoDB
//   try {
//     plantList = await client.db("smartwater").collection("plants").find({}).toArray();
//   } catch (error) {
//     return NextResponse.json({ status: 500, body: error });
//   }
//   if (!plantList) return NextResponse.json({ status: 404, body: {} });
//   return NextResponse.json({ status: 200, body: plantList });
// };
