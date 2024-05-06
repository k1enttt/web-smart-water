import { hours, data } from "@/data/plant";
import { LineChart } from "@mui/x-charts/LineChart";

interface PercentageRowProps {
  label: "Humidity" | "Temperature" | "Moisture";
  value: number;
  testPlantId: string
}

export const PercentageRow = ({ label, value, testPlantId }: PercentageRowProps) => {
  // Make testPlantId to a number
  const id = parseInt(testPlantId);

  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-around">
        <span>{label}</span>
        <span>
          {value}
          {label === "Temperature" ? "°C" : "%"}
        </span>
      </div>
      <LineChart
        xAxis={[{ data: hours , min: 0, max: 23 }]}
        series={[
          {
            curve: "linear", 
            data: (label === "Temperature" 
              ? data[id].temperature 
              : label === "Humidity" 
                ? data[id].humidity 
                : data[id].moisture),
            valueFormatter: (v) => `${v}${label === "Temperature" ? "°C" : "%"}`,
          },
        ]}
        width={450}
        height={200}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
};
