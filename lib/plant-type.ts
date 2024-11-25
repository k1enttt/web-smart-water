import { env } from "process";

export const getPlantTypes = async () => {
  const response = await fetch(`${env.BASE_URL}/api/plant-type`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plant types");
  }

  const data = await response.json();

  return data.body;
}

export const getPlantTypeById = async (id: string) => {
  const response = await fetch(`${env.BASE_URL}/api/plant-type/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plant type");
  }

  const data = await response.json();

  return data.body;
}

