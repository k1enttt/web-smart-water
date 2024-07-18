import { PlantSchema } from "@/schemas";
import { child, get, set } from "firebase/database";
import { env } from "process";
import { plantsRef } from "./db";
import { NextResponse } from "next/server";
export let plants: PlantSchema[] = [];

const baseUrl = env.BASE_URL || "http://localhost:3000";
const baseApiUrl = `${baseUrl}/api`;

export const getPlants = async () => {
  const response: NextResponse = await fetch(`${baseApiUrl}/plants`).then(
    (response) => response.json()
  );

  if (!response.status || response.status !== 200) {
    return [];
  }

  if (!response.body) {
    return [];
  }

  const plantList = Object.values(response.body);

  return plantList;
};

export async function updateServerManualMode(  
  plantId: string | undefined,
  value: number
) {
  if (!plantId) {
    console.error("Plant ID is required");
    return 0;
  }

  if (value !== 1 && value !== 0) {
    console.error("Invalid value: ", value);
    return 0;
  }

  const response: NextResponse = await fetch(`${baseApiUrl}/plants/${plantId}/manual_mode`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      server: value
    }),
  }).then((response) => response.json());

  
  if (!response || response.status !== 200) {
    console.error(response);
    return 0;
  }

  return 1;
}

/** Send a PUT request to localhost:3000/api/plants/[id] to update the "water_button_state" attribute */
export const updatePlantWaterStatus = async (
  plantId: string | undefined,
  water_button_state: boolean,
) => {
  if (!plantId) {
    console.error("Plant ID is required");
    return 0;
  }
  
  const response: NextResponse = await fetch(`${baseApiUrl}/plants/${plantId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      water_button_state: water_button_state ,
    }),
  }).then((response) => response.json());

  if (!response || response.status !== 200) {
    console.error(response);
    return 0;
  }

  return 1;
};

export const updateAutomaticSwitchState = async (
  id: string | undefined,
  state: number
) => {
  // Update the plant in the firebase database
  if (!id) {
    console.error("Plant ID is required");
    return 0;
  }
  if (state !== 1 && state !== 2) {
    console.error("Invalid state: ", state);
    return 0;
  }
  const response: NextResponse = await fetch(
    `${baseUrl}/plants/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ water_mode: state }),
    }
  ).then((response) => response.json());

  if (!response || response.status !== 200) {
    console.error(response);
    return 0;
  }
  return 1;
};

export const getPlantById = async (id: string) =>
  await get(child(plantsRef, `/${id}`));

export const updatePlantData = async (plant: PlantSchema) => {
  // Update the plant in the firebase database
  await set(child(plantsRef, `/${plant.id}`), {
    ...plant,
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return 0;
    });
  return 1;
};

export const updatePlant = async (plant: PlantSchema) => {
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
