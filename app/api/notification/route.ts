import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/Notification";

export async function GET() {
  await dbConnect();

  try {
    const response = await Notification.find();
    if (!response) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}