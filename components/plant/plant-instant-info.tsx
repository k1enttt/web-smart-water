import { PlantSchema } from "@/schemas";
import { PercentageCol } from "../percentage-col";

const PlantInstantInfo = ({plant}:{plant: PlantSchema}) => {
  return (
    <>
      <div className="text-xl font-semibold text-center py-6">
        Trạng thái hiện tại
      </div>
      <div className="w-full flex items-center justify-around object-contain overflow-x-auto pb-4">
        <PercentageCol type="humidity" value={plant.humidity} />
        <PercentageCol type="moisture" value={plant.moisture} />
        <PercentageCol type="temperature" value={plant.temperature} />
        <PercentageCol type="light" value={plant.light} />
      </div>
    </>
  );
};

export default PlantInstantInfo;
