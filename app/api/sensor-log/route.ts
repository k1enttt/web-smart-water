import dbConnect from "@/lib/dbConnect";
import SensorLog from "@/models/SensorLog";

export async function GET() {
  await dbConnect();

  try {
    const response = await SensorLog.find();
    if (!response) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}