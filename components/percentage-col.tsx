import { Plant } from "@/schemas";
import BasicGauges from "@/components/gauge-chart";

type SensorType = "humidity" | "temperature" | "moisture" | "light";
interface PercentageColProps {
  type: SensorType;
  plant: Plant;
}

export const PercentageCol = ({ type, plant }: PercentageColProps) => {
  // Make testPlantId to a number
  
  const value = plant[type as SensorType] || 0;
  const unit = type === "temperature" ? "°C" : type == "light" ? " lx" : "%";
  const label = (type == 'humidity' ? 'Độ ẩm không khí' : type == 'temperature' ? 'Nhiệt độ không khí' : type == 'moisture' ? 'Độ ẩm đất' : 'Ánh sáng');

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <span>{label}</span>
        <span>
          <BasicGauges value={value} unit={unit}/>
        </span>
      </div>
    </div>
  );
};
