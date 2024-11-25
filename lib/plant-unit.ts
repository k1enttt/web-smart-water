"use server";
import PlanUnitModel, { PlantUnits } from "@/models/PlantUnit";

export const getPlantUnits = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/plant-unit`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plant units");
  }

  const data = await response.json();

  return data.body;
};

export const getPlantUnitById = async (plant_id: string) => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/plant-unit/${plant_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch plant unit");
  }

  const data = await response.json();

  return data.body;
};

export const putPlantUnit = async (plant_unit: PlantUnits) => {
  console.log(process.env.BASE_URL);
  const response = await fetch(
    `${process.env.BASE_URL}/api/plant-unit/${plant_unit._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant_unit),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update plant unit");
  }

  const data = await response.json();

  return data;
};

export const deletePlantUnit = async (plant_id: string) => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/plant-unit/${plant_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete plant unit");
  }

  const data = await response.json();

  return data.body;
};

/** Send a PUT request to localhost:3000/api/plants/[id] to update the "water_button_state" attribute */
export const putPlantUnitStatus = async (plant_id: string, status: boolean) => {
  if (!plant_id) {
    console.error("Plant ID is required");
    return 0;
  }

  const response = await fetch(
    `${process.env.BASE_URL}/api/plant-unit/${plant_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update plant unit status");
  }

  const data = await response.json();

  return data.body;
};

export const putAutomationWatering = async (
  plant_id: string,
  automatic_watering: boolean
) => {
  // Update the plant in the firebase database
  if (!plant_id) {
    throw new Error("Plant ID is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/device/${plant_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ automatic_watering }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update device");
  }

  const data = await response.json();

  return data.body;
};
