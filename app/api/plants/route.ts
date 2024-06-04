'use server';
import { createPlant, deletePlant, getPlants } from "@/lib/plants";
import { PlantSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const plants = await getPlants().then((snapshot) => snapshot.val());
        return NextResponse.json({ status: 200, body: plants });
    } catch (error) {
        return NextResponse.json({ status: 500, body: error });
    }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { name, description, temperature, humidity, moisture, light, water_mode, water_button_state, daylogs } =
        await req.json();
    try {
        const plant: PlantSchema = {
            name,
            description,
            id: Date.now().toString(),
            temperature,
            humidity,
            moisture,
            light,
            water_mode,
            water_button_state,
            daylogs
        };
        await createPlant(plant);
        return NextResponse.json({ status: 200, body: plant });
    } catch (error) {
        return NextResponse.json({ status: 500, body: error });
    }
};
