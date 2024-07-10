"use client";
import { LineChart } from "@mui/x-charts/LineChart";
export const PlantLineChart = ({
  hours,
  value,
  unit,
  className,
}: {
  hours: number[];
  value: (number | null)[];
  unit: string;
  className?: string;
}) => {
  className = className || "";
  function formatValue(value: number | null, unit: string) {
    function round(value: number) {
      return Math.round(value * 10) / 10;
    }
    if (value == null) return "N/A";
    return `${round(value)}${unit}`;
  }
  return (
    <LineChart
      className={className}
      xAxis={[
        {
          data: hours,
          min: 0,
          max: 23,
          valueFormatter: (v) => `${v}h`,
        },
      ]}
      series={[
        {
          curve: "linear",
          data: value,
          valueFormatter: (v) => formatValue(v, unit),
        },
      ]}
      height={200}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};
