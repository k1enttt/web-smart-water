import { NextRequest, NextResponse } from "next/server";
import { child, get, set, update } from "firebase/database";
import { plantsRef } from "@/lib/firebase";
import { ObjectId } from "mongodb";

// export async function PUT(req: NextRequest) {
//   // Thiết lập Mongo Client
//   const client = await connectToMongoDB();
//   let response: any = {};

//   // Get the plant id from the request
//   const id = req.url.split("plants/")[1].split("/manual_mode")[0];
//   const payload = await req.json();
//   const { server } = payload;

//   if (typeof server !== "number") {
//       return NextResponse.json({
//         status: 400,
//         body: { error: server + " is an invalid value" },
//       });
//   }

//   try {
//     response = await client.db("smartwater").collection("plants").updateOne({ _id: new ObjectId(id) }, { $set: {"manual_mode.server" : server} });
//   } catch (error) {
//     return NextResponse.json({ status: 500, body: error });
//   }
//   if (!response) return NextResponse.json({ status: 404, body: {} });
//   return NextResponse.json({ status: 200, body: response });
// }
