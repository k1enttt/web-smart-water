import dbConnect from "@/lib/dbConnect";
import Device from "@/models/Device";

export async function GET() {
  await dbConnect();

  try {
    const response = await Device.find();
    if (!response) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}