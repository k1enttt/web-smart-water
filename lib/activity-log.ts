import { push, update } from "firebase/database";
import { activityLogsRef } from "./firebase";
import { NextResponse } from "next/server";
import { env } from "process";

const baseUrl = env.BASE_URL || "http://localhost:3000";
const baseApiUrl = `${baseUrl}/api`;

export const getActivityLogs = async (): Promise<ActivityLog[]> => {
  const response: NextResponse = await fetch(`${baseApiUrl}/activity_logs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

  // Convert the response body to an array of activity logs
  const resBody = response.body as unknown as { [key: string]: ActivityLog };
  const activityLogList = Object.keys(resBody).map((key: string) => {
    return {
      ...resBody[key],
      id: key,
    };
  });

  return activityLogList;
};

export const updateActivityLog = async (data: ActivityLog) => {
  const newLogKey = push(activityLogsRef).key;

  const updates: {
    [key: string]: ActivityLog;
  } = {};
  updates["/" + newLogKey] = data;

  return await update(activityLogsRef, updates);
};
