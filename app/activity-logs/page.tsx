import { Payment, activityLogColumns, columns } from "./columns"
import { DataTable } from "./data-table"
import { payments, activity_logs } from "@/data/plant"

const ActivityLogPage = () => {
  const data = activity_logs;
  return ( 
  <div className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
    <div className="container mx-auto py-10">
      <DataTable columns={activityLogColumns} data={data} />
    </div>
  </div> );
}
 
export default ActivityLogPage;