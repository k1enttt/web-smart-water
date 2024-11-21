import dbConnect from "@/lib/dbConnect";
import PlantUnit from "@/models/PlantUnit";

export async function GET() {
  await dbConnect();

  try {
    const response = await PlantUnit.find();
    if (!response) {
      return Response.json({ success: false }, { status: 400 });
    }
    return Response.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
