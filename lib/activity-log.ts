import { push, update } from "firebase/database";
import { activityLogsRef } from "./db";
import { NextResponse } from "next/server";

const baseUrl = "http://localhost:3000/api";

export const getActivityLogs = async (): Promise<ActivityLog[]> => {
  const response: NextResponse = await fetch(`${baseUrl}/activity-logs`).then(
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
