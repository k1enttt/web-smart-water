import { child, DatabaseReference, get, push, ref, update } from "firebase/database";
import { db } from "./plants";

let logRef: DatabaseReference = child(ref(db), "activity_logs");

export const getActivityLogs = async () => {
  return await get(logRef);
};

export const updateActivityLog = async (data: ActivityLog) => {
  const newLogKey = push(logRef).key;

  const updates: {
    [key: string]: ActivityLog;
  } = {};
  updates["/" + newLogKey] = data;
  
  return await update(logRef, updates);
}