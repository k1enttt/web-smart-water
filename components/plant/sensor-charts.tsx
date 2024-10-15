import { hours } from "@/data/plant";
import { PlantLineChart } from "../line-chart";

const SensorCharts = ({ plantId }: { plantId: string }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto 2xl:w-[800px]">
        <div className="text-lg font-semibold py-6">Biểu đồ theo giờ</div>
        <div className="w-full ">
          <div>Nhiệt độ không khí</div>
          <PlantLineChart plantId={plantId} hours={hours} type="temperature"/>
        </div>
        <div className="w-full">
          <div>Độ ẩm không khí</div>
          <PlantLineChart plantId={plantId} hours={hours} type="humidity" />
        </div>
        <div className="w-full">
          <div>Độ ẩm đất</div>
          <PlantLineChart plantId={plantId} hours={hours} type="moisture"/>
        </div>
        <div className="w-full">
          <div>Cường độ ánh sáng</div>
          <PlantLineChart plantId={plantId} hours={hours}  type="light"/>
        </div>
      </div>
    </>
  );
};

export default SensorCharts;
