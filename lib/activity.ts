import { Activities } from "@/models/Activity";
import { env } from "process";

export const getActivities = async () => {
  const response = await fetch(`${env.BASE_URL}/api/activity`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }

  const data = await response.json();

  return data.body;
};

export const getActivityById = async (activity_id: string) => {
  const response = await fetch(`${env.BASE_URL}/api/activity/${activity_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) { 
    throw new Error("Failed to fetch activity");
  }

  const data = await response.json();

  return data.body;
}

export const putActivity = async (params: {
  activity: Activities
}) => {
  const { activity } = params;

  const response = await fetch(`${env.BASE_URL}/api/activity/${activity._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    throw new Error("Failed to update activity");
  }

  const data = await response.json();

  return data.body;
};

export const deleteActivity = async (params: {
  activity_id: string
}) => {
  const { activity_id } = params;
   const response = await fetch(`/api/activity/${activity_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    throw new Error("Failed to delete activity");
  }

  const data = await response.json();

  return data.body;
};
