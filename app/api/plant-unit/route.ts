import dbConnect from "@/lib/dbConnect";
import PlantUnit from "@/models/PlantUnit";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const plantUnits = await PlantUnit.find();
    if (!plantUnits) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: plantUnits }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
