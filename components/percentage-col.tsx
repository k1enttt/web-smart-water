import { Plant } from "@/schemas";
import BasicGauges from "@/components/gauge-chart";

interface PercentageColProps {
  type: "humidity" | "temperature" | "moisture";
  plant: Plant;
}

export const PercentageCol = ({ type, plant }: PercentageColProps) => {
  // Make testPlantId to a number
  
  const value = plant[type as "temperature" | "humidity" | "moisture"] || 0;
  const unit = type === "temperature" ? "°C" : "%";
  const label = (type == 'humidity' ? 'Độ ẩm không khí' : type == 'temperature' ? 'Nhiệt độ không khí' : 'Độ ẩm đất');

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
