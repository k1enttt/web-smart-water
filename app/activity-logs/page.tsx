import { getActivityLogs } from "@/lib/activity-log";
import { activityLogColumns } from "./columns"
import { DataTable } from "./data-table"

const ActivityLogPage = async () => {
  const rawActivityLogs = await getActivityLogs()
    .then((snapshot) => snapshot.val())
    .catch((error) => {
      console.error(error);
      return {};
    });
  const data = Object.keys(rawActivityLogs).map((key) => {
    return {
      ...rawActivityLogs[key],
      id: key,
      }
    });
  return ( 
  <div className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
    <div className="container mx-auto py-10">
      <DataTable columns={activityLogColumns} data={data} />
    </div>
  </div> );
}
 
export default ActivityLogPage;