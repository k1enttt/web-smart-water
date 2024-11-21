import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;

  await dbConnect();

  try {
    const response = await User.findById(id);
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
  const { user } = body;

  await dbConnect();

  try {
    const response = await User.create(user);
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
  const { user } = body;

  await dbConnect();

  try {
    const response = await User.findByIdAndUpdate(id, user, {
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
