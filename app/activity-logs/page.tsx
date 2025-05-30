import { LogTable } from "@/components/log-table";
import { Activities } from "@/models/Activity";

const ActivityLogPage = async () => {
  const activitiesData: Activities[] = [];

  // TODO: Fetch activity logs from MongoDB  

  if (!activitiesData) {
    return <div>Loading...</div>;
  }
  
  return ( 
  <div className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
    <div className="container mx-auto py-10">
      {/* <LogTable data={activitiesData} /> */}
    </div>
  </div> );
}

export default ActivityLogPage;