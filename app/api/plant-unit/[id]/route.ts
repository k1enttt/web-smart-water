import dbConnect from "@/lib/dbConnect";
import PlantUnit from "@/models/PlantUnit";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  await dbConnect();

  try {
    const plantUnit = await PlantUnit.findById(id);
    if (!plantUnit) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, body: plantUnit }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  await dbConnect();

  try {
    const response = await PlantUnit.create(body);
    return Response.json({ success: true, body: response }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const body = await req.json();

  await dbConnect();

  try {
    const response = await PlantUnit.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return Response.json({ success: false }, { status: 200 });
    }
    return Response.json({ success: true, body: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
