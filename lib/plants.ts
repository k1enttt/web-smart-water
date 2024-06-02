import { Plant } from "@/schemas";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { firebaseApp } from "@/lib/db";
export let plants: Plant[] = [];

const rtdbUrl =
  "https://smartwater-fe007-default-rtdb.asia-southeast1.firebasedatabase.app";

export const db = getDatabase(firebaseApp, rtdbUrl);

export const dbRef = ref(db);

export const getPlants = async () =>
  await get(child(dbRef, `plants`))
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });

export const getPlantById = async (id: string) =>
  await get(child(dbRef, `plants/${id}`));

export const createPlant = async (plant: Plant) => {
  await plants.push(plant);
  return plant;
};

export const updatePlantData = async ({
  id,
  name,
  description,
  temperature,
  humidity,
  moisture,
  light,
  water_button_state,
  water_mode,
}: Plant) => {
  // Update the plant in the firebase database
  await set(child(dbRef, `plants/${id}`), {
    id,
    name,
    description,
    temperature,
    humidity,
    moisture,
    light,
    water_button_state,
    water_mode,
  })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
  // TODO: Update the plant
};

export const updatePlantWaterStatus = async (
  plantId: string,
  status: boolean
) => {
  // Update the plant in the firebase database
  await set(child(dbRef, `plants/${plantId}/water_button_state`), status)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

export const updateAutomaticSwitchState = async (id: string, state: number) => {
  // Update the plant in the firebase database
  await set(child(dbRef, `plants/${id}/water_mode`), state)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
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
