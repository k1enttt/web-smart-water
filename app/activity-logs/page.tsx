import { LogTable } from "@/components/log-table";
import { getActivityLogs } from "@/lib/activity-log";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ActivityLogPage() {
  const activityLogsData = await getActivityLogs().catch((error) => {
    return null;
  });

  if (!activityLogsData) return notFound;

  return (
    <Suspense fallback={null}>
      <div className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
        <div className="container mx-auto py-10">
          <LogTable data={activityLogsData} />
        </div>
      </div>
    </Suspense>
  );
}
