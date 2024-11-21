import dbConnect from "@/lib/dbConnect";
import PlantUnit from "@/models/PlantUnit";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;

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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const body = await req.json();
  const { plantunit } = body;

  await dbConnect();

  try {
    const response = await PlantUnit.findByIdAndUpdate(id, plantunit, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return Response.json({ success: false }, { status: 200 });
    }
    return Response.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
