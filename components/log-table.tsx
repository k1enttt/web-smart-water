"use client";
import { DataTable } from "@/components/data-table";
import { DataSnapshot, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { activityLogColumns } from "@/components/columns";
import { getActivityLogsRef } from "@/lib/db";

const activityLogsRef = getActivityLogsRef();
export const LogTable = ({ data }: { data: ActivityLog[] }) => {
  const [activityLogsList, setActivityLogsList] = useState<ActivityLog[]>(data);
  function handleDataChange(snapshot: DataSnapshot) {
    const payload = snapshot.val();
    const activityLogs = Object.keys(payload).map((key) => {
      return {
        ...payload[key],
        id: key,
      };
    });
    setActivityLogsList(activityLogs);
  }

  useEffect(() => {
    const listener = onValue(activityLogsRef, handleDataChange);
    return () => listener();
  }, [activityLogsList]);
  return <DataTable columns={activityLogColumns} data={data} />;
};
