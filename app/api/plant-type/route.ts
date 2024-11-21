import dbConnect from "@/lib/dbConnect";
import PlantType from "@/models/PlantType";

export async function GET() {
  await dbConnect();

  try {
    const response = await PlantType.find();
    if (!response) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}