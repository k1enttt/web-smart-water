import { hours, newdata as data } from "@/data/plant";
import { Plant } from "@/schemas";
import { LineChart } from "@mui/x-charts/LineChart";

interface PercentageRowProps {
  label: "Humidity" | "Temperature" | "Moisture";
  plant: Plant;
}

export const PercentageRow = ({ label, plant }: PercentageRowProps) => {
  // Make testPlantId to a number
  const temperature = plant.daylogs.map((d) => d.temperature);
  const humidity = plant.daylogs.map((d) => d.humidity);
  const moisture = plant.daylogs.map((d) => d.moisture);

  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-around">
        <span>{label}</span>
        <span>
          {plant[label.toLowerCase() as "temperature" | "humidity" | "moisture"]}
          {label === "Temperature" ? "°C" : "%"}
        </span>
      </div>
      <LineChart
        xAxis={[{ data: hours , min: 0, max: 23 }]}
        series={[
          {
            curve: "linear", 
            data: (label === "Temperature" 
              ? temperature
              : label === "Humidity" 
                ? humidity
                : moisture),
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
