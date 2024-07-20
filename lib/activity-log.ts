import { push, update } from "firebase/database";
import { activityLogsRef } from "./firebase";
import { env } from "process";

const baseUrl = env.BASE_URL || "http://localhost:3000";
const baseApiUrl = `${baseUrl}/api`;

export const getActivityLogs = async () => {
  const response = await fetch(`${baseApiUrl}/activity_logs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
  })
  .then(
    (response) => response.json()
  );

  if (!response.status || response.status !== 200) {
    return [];
  }

  if (!response.body) {
    return [];
  }

  return response.body;
};

// export const updateActivityLog = async (data: ActivityLog) => {
//   const newLogKey = push(activityLogsRef).key;

//   const updates: {
//     [key: string]: ActivityLog;
//   } = {};
//   updates["/" + newLogKey] = data;

//   return await update(activityLogsRef, updates);
// };
