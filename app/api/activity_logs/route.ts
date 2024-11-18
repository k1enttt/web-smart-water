"use server";
// import { connectToMongoDB } from "@/lib/dbConnect";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (req: NextRequest) => {
//   let activityLogList = [];

//   const client: MongoClient = await connectToMongoDB();
//   if (!client) return NextResponse.json({ status: 500, body: {} });

//   try {
//     activityLogList = await client.db("smartwater").collection("activity_logs").find({}).limit(20).toArray();
//   } catch (error) {
//     return NextResponse.json({ status: 500, body: error });
//   }
//   if (!activityLogList) return NextResponse.json({ status: 404, body: {} });
//   return NextResponse.json({ status: 200, body: activityLogList });
// };