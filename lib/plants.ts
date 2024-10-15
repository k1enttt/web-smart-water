import { PlantSchema } from "@/schemas";
import { child, get, set } from "firebase/database";
import { env } from "process";
import { plantsRef } from "./db";
import { NextResponse } from "next/server";
export let plants: PlantSchema[] = [];

const baseUrl = env.BASE_URL || "http://localhost:3000";
const baseApiUrl = `${baseUrl}/api`;

export const getPlants = async () =>
  await get(child(dbRef, `plants`))
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });

export const getPlantById = async (id: string) => {
  const plant = await get(child(dbRef, `plants/${id}`)).then((response) => response.val() as PlantSchema).catch((error) => {
    throw new Error(error);
  });
  return plant;
};

export const getHumidity = async (id: string) => {
  const humidity = await get(child(dbRef, `plants/${id}/humidity`)).then((response) => response.val()).catch((error) => {
    throw new Error(error);
  });
  return humidity;
} 

export const getMoisture = async (id: string) => {
  const moisture = await get(child(dbRef, `plants/${id}/moisture`)).then((response) => response.val()).catch((error) => {
    throw new Error(error);
  });
  return moisture;
} 

export const getTemperature = async (id: string) => {
  const temperature = await get(child(dbRef, `plants/${id}/temperature`)).then((response) => response.val()).catch((error) => {
    throw new Error(error);
  });
  return temperature;
} 

export const getLight = async (id: string) => {
  const light = await get(child(dbRef, `plants/${id}/light`)).then((response) => response.val()).catch((error) => {
    throw new Error(error);
  });
  return light;
} 

export const createPlant = async (plant: PlantSchema) => {
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
}: PlantSchema) => {
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

export const updateCurrentTemperature = async (
  plantId: string,
  data: number
) => {
  await set(child(dbRef, `plants/${plantId}/temperature`), data)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

export const updateCurrentHumidity = async (plantId: string, data: number) => {
  await set(child(dbRef, `plants/${plantId}/humidity`), data)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

export const updateCurrentLight = async (plantId: string, data: number) => {
  await set(child(dbRef, `plants/${plantId}/light`), data)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

export const updateCurrentMoisture = async (plantId: string, data: number) => {
  await set(child(dbRef, `plants/${plantId}/moisture`), data)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

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
