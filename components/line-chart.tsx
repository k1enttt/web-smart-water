'use client';
import { LineChart } from "@mui/x-charts/LineChart";
export const PlantLineChart = ({hours, value, unit, className} : {hours: number[], value: (number | null)[], unit: string, className?: string}) => {
    className = className || "";
    return (
    <LineChart
          className={className}
          xAxis={[
            { 
              data: hours, 
              min: 0, 
              max: 23, 
              valueFormatter: (v) => `${v}h`
            }
          ]}
          series={[
            {
              curve: "linear",
              data: value,
              valueFormatter: (v) => (v != null) ? `${v}${unit}` : "N/A",
            },
          ]}
          height={200}
          grid={{ vertical: true, horizontal: true }}
        />);
}