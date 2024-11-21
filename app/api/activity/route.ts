"use server";
import dbConnect from "@/lib/dbConnect";
import Activity from "@/models/Activity";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  await dbConnect();

  try {
    const response = await Activity.find();
    if (!response) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
