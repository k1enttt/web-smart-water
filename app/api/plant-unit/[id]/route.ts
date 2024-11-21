import dbConnect from "@/lib/dbConnect";
import PlantUnit from "@/models/PlantUnit";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  await dbConnect();

  try {
    const plantUnit = await PlantUnit.findById(id);
    if (!plantUnit) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: plantUnit }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  await dbConnect();

  try {
    const plantUnit = await PlantUnit.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plantUnit) {
      return Response.json({ success: false }, { status: 200 });
    }
    return Response.json({ success: true, data: plantUnit }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
