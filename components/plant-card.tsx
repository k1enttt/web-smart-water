import { PlantSchema } from "@/schemas";
import CardWrapper from "@/components/card-wrapper";
import PlantInfoCard from "./card-plant-info";
import { PlantLineChart } from "./line-chart";
import { hours } from "@/data/plant";
import { PercentageCol } from "./percentage-col";

export const PlantCard = ({ plant }: { plant: PlantSchema }) => {
  return (
    <div className="w-full flex gap-x-2 px-6">
      <CardWrapper plant={plant} className="flex-1">
        <div className="pb-6">
          <div className="text-xl font-semibold text-center py-2">
            Trạng thái hiện tại
          </div>
          <div className="border p-4 rounded-lg">
            <div className="w-full flex items-center justify-around object-contain overflow-x-auto">
              <PercentageCol type="humidity" value={plant.humidity} />
              <PercentageCol type="moisture" value={plant.moisture} />
              <PercentageCol type="temperature" value={plant.temperature} />
              <PercentageCol type="light" value={plant.light} />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2 items-center justify-center mx-auto 2xl:w-[800px]">
            <div className="text-xl font-semibold py-2">Biểu đồ theo giờ</div>
            <div className="w-full border rounded-lg p-4">
              <div>Nhiệt độ không khí</div>
              <PlantLineChart
                plantId={plant.id}
                hours={hours}
                type="temperature"
              />
            </div>
            <div className="w-full border rounded-lg p-4">
              <div>Độ ẩm không khí</div>
              <PlantLineChart
                plantId={plant.id}
                hours={hours}
                type="humidity"
              />
            </div>
            <div className="w-full border rounded-lg p-4">
              <div>Độ ẩm đất</div>
              <PlantLineChart
                plantId={plant.id}
                hours={hours}
                type="moisture"
              />
            </div>
            <div className="w-full border rounded-lg p-4">
              <div>Cường độ ánh sáng</div>
              <PlantLineChart plantId={plant.id} hours={hours} type="light" />
            </div>
          </div>
        </div>
      </CardWrapper>
      <PlantInfoCard
        plant={plant}
        className="flex-1 min-w-[300px] max-w-[400px] lg:inline hidden"
      />
    </div>
  );
};
