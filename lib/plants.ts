import { PlantSchema } from "@/schemas";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { firebaseApp } from "@/lib/db";
export let plants: PlantSchema[] = [];

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
