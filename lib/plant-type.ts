import { mutate } from "swr";

export const getPlantTypes = async () => {
  const response = await fetch(`api/plant-type`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plant types");
  }

  const data = await response.json();

  mutate("api/plant-type", data, false);

  return data.body;
}

export const getPlantTypeById = async (id: string) => {
  const response = await fetch(`api/plant-type/${id}`, {
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

