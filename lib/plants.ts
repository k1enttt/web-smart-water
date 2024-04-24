import { Plant } from "@/schemas";
import { child, get, getDatabase, ref } from "firebase/database";
import { firebaseApp } from "./db";

export const plants: Plant[] = [];

const rtdbUrl =
    "https://smartwater-fe007-default-rtdb.asia-southeast1.firebasedatabase.app";

const dbRef = ref(getDatabase(firebaseApp, rtdbUrl));

export const getPlants = async () => await get(child(dbRef, `plants`));

export const getPlantById = async (id: string) => {
    const plant = await plants.find((plant) => plant.id === id);
    return plant;
};

export const createPlant = async (plant: Plant) => {
    await plants.push(plant);
    return plant;
};

export const updatePlant = async (plant: Plant) => {
    return await plants.splice(
        plants.findIndex((p) => p.id === plant.id),
        1,
        plant
    );
};

export const deletePlant = async (id: string) => {
    return await plants.splice(
        plants.findIndex((plant) => plant.id === id),
        1
    );
};
