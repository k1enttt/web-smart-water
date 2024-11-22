import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  await dbConnect();

  try {
    const response = await User.find();
    if (!response) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, body: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}