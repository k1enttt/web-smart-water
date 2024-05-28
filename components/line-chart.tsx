'use client';
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect } from "react";
export const PlantLineChart = ({hours, value, unit} : {hours: number[], value: (number | null)[], unit: string}) => {
    var width = 800 ;
    return (
    <LineChart
          xAxis={[{ data: hours, min: 0, max: 23 }]}
          series={[
            {
              curve: "linear",
              data: value,
              valueFormatter: (v) => `${v}${unit}`,
            },
          ]}
          width={width}
          height={200}
          grid={{ vertical: true, horizontal: true }}
        />);
}