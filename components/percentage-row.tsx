import { LineChart } from "@mui/x-charts/LineChart";

interface PercentageRowProps {
  label: "Humidity" | "Temperature" | "Moisture";
  percentage: number;
}

export const PercentageRow = ({ label, percentage }: PercentageRowProps) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-around">
        <span>{label}</span>
        <span>
          {percentage}
          {label === "Temperature" ? "°C" : "%"}
        </span>
      </div>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={450}
        height={200}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
};
