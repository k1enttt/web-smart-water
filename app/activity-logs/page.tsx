import { getActivityLogs } from "@/lib/activity-log";
import { activityLogColumns } from "./columns"
import { DataTable } from "./data-table"

const ActivityLogPage = async () => {
  const activityLogList = await getActivityLogs();
  
  return ( 
  <div className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
    <div className="container mx-auto py-10">
      <DataTable columns={activityLogColumns} data={activityLogList} />
    </div>
  </div> );
}
 
export default ActivityLogPage;