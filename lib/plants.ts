import { Plant } from "@/schemas";
import { child, get, getDatabase, ref, set, onValue } from "firebase/database";
import { firebaseApp } from "@/lib/db";
export let plants: Plant[] = [];

const rtdbUrl =
    "https://smartwater-fe007-default-rtdb.asia-southeast1.firebasedatabase.app";

export const db = getDatabase(firebaseApp, rtdbUrl);
export const dbRef = ref(db);

export const getPlants = async () => await get(child(dbRef, `plants`));

export const getPlantById = async (id: string) =>
    await get(child(dbRef, `plants/${id}`));

export const listenOnChangeById = (id: string) => {
    let plant: Plant = {} as Plant;
    // Listen for changes in the database
    onValue(ref(db, `plants/${id}`), (snapshot) => {
        const data = snapshot.val();
        const plantIndex = plants.findIndex((plant) => plant.id === id);
        plants[plantIndex] = data;
        plant = data;
        console.log(plant);
    });
    return plant;
};

export const createPlant = async (plant: Plant) => {
    await plants.push(plant);
    return plant;
};

export const updatePlantData = async ({
    id, 
    name,
    short_description,
    temperature,
    humidity,
    moisture,
    light,
    is_watered,
    is_automatic
}: Plant) => {
    // Update the plant in the firebase database
    await set(child(dbRef, `plants/${id}`), {
        id,
        name,
        short_description,
        temperature,
        humidity,
        moisture,
        light,
        is_watered,
        is_automatic
    });
    // TODO: Update the plant
};

export const updatePlantAutomaticStatus = async (plantId: string, status: boolean) => {
    // Update the plant in the firebase database
    await set(child(dbRef, `plants/${plantId}/is_automatic`), status);
};

export const updatePlantWaterStatus = async (plantId: string, status: boolean) => {
    // Update the plant in the firebase database
    await set(child(dbRef, `plants/${plantId}/is_watered`), status);
};

export const updatePlant = async (plant: Plant) => {
    return await plants.splice(
        plants.findIndex((p) => p.id === plant.id),
        1,
        plant
    );
}

export const deletePlant = async (id: string) => {
    return await plants.splice(
        plants.findIndex((plant) => plant.id === id),
        1
    );
};