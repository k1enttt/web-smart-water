import { deletePlant, getPlantById, updatePlant } from "@/lib/plants";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const id = req.url.split("plants/")[1];
    try {
        const plant = await getPlantById(id);
        if (!plant) return NextResponse.json({ status: 404, body: {} });
        return NextResponse.json({ status: 200, body: plant });
    } catch (error) {
        return NextResponse.json({ status: 500, body: error });
    }
};

export const PUT = async (req: NextRequest) => {
try {
    const { name, description, temperature, humidity, moisture, light, water_button_state, water_mode, daylogs} = await req.json();
    const id = req.url.split("plants/")[1];
    const plant = await updatePlant({
        id, 
        name, 
        description, 
        temperature, 
        humidity, 
        moisture, 
        light,
        water_mode, 
        water_button_state,
        daylogs
    });
    return NextResponse.json({ status: 200, body: plant});
} catch (error) {
    return NextResponse.json({ status: 500, body: error });
}
}

export const DELETE = async (req: NextRequest) => {
    try {
        const id = req.url.split("plants/")[1];
        await deletePlant(id);
        return NextResponse.json({ status: 200, body: {}});
    } catch (error) {
        return NextResponse.json({ status: 500, body: error });
    }
};
