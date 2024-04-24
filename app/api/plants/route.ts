'use server';
import { createPlant, deletePlant, getPlants } from "@/lib/plants";
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
    const { name, description, temperature, humidity, moisture } =
        await req.json();
    try {
        const plant = {
            name,
            description,
            id: Date.now().toString(),
            temperature,
            humidity,
            moisture,
        };
        await createPlant(plant);
        return NextResponse.json({ status: 200, body: plant });
    } catch (error) {
        return NextResponse.json({ status: 500, body: error });
    }
};
