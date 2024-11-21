import dbConnect from "@/lib/dbConnect";
import Device from "@/models/Device";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  await dbConnect();

  try {
    const device = await Device.findById(id);
    if (!device) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: device }, { status: 200 });
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
    const device = await Device.findByIdAndUpdate(id, req.body);
    if (!device) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: device }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}