import { PlantSchema } from "@/schemas";
import { child, get, set } from "firebase/database";
import { plantsRef } from "./firebase";
import { NextResponse } from "next/server";
import { mutate } from "swr";
import { PlantUnit } from "@/models/PlantUnit";
import { ObjectId } from "mongoose";
export let plants: PlantSchema[] = [];

export const getPlantUnits = async () => {
  const response = await fetch("api/plant-unit", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plant units");
  }

  const data = await response.json();

  mutate("api/plant-unit", data, false);

  return data.data;
};

/** Send a PUT request to localhost:3000/api/plants/[id] to update the "water_button_state" attribute */
export const putPlantUnitStatus = async (params: {
  plantId: ObjectId;
  status: boolean;
}) => {
  const { plantId, status } = params;

  if (!plantId) {
    console.error("Plant ID is required");
    return 0;
  }

  const response = await fetch(`api/plant-unit/${plantId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update plant unit status");
  }

  const data = await response.json();

  return data;
};

export const putDeviceAutomation = async (params: {
  id: ObjectId;
  is_automatic: boolean;
}) => {
  const { id, is_automatic } = params;

  // Update the plant in the firebase database
  if (!id) {
    throw new Error("Plant ID is required");
  }

  const response = await fetch(`api/device/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_automatic }),
  });

  if (!response.ok) {
    throw new Error("Failed to update device");
  }

  const data = await response.json();

  return data;
};

export const getPlantById = async (params: { id: ObjectId }) => {
  const { id } = params;

  const response = await fetch(`api/plant-unit/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plant unit");
  }

  const data = await response.json();

  return data.data;
};

export const putPlantUnit = async (params: { plant_unit: PlantUnit }) => {
  const { plant_unit } = params;

  const response = await fetch(`api/plant-unit/${plant_unit._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plant_unit),
  });

  if (!response.ok) {
    throw new Error("Failed to update plant unit");
  }

  const data = await response.json();

  return data;
};

export const deletePlant = async (params: {id: ObjectId}) => {
  const { id } = params;

  const response = await fetch(`api/plant-unit/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete plant unit");
  }

  const data = await response.json();

  return data;
};
