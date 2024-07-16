import { LogTable } from "@/components/log-table";
import { getActivityLogs } from "@/lib/activity-log";

const ActivityLogPage = async () => {
  const activityLogsData = await getActivityLogs();
  
  return ( 
  <div className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
    <div className="container mx-auto py-10">
      <LogTable data={activityLogsData} />
    </div>
  </div> );
}
 
export default ActivityLogPage;