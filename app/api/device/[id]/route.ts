import dbConnect from "@/lib/dbConnect";
import Device from "@/models/Device";
import { NextRequest } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;

  await dbConnect();

  try {
    const response = await Device.findById(id);
    if (!response) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { device } = body;

  await dbConnect();

  try {
    const response = await Device.create(device);
    return Response.json({ success: true, data: response }, { status: 201 });
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
  const { device } = body;

  await dbConnect();

  try {
    const response = await Device.findByIdAndUpdate(id, device, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
