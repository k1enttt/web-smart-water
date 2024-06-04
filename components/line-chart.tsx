'use client';
import { LineChart } from "@mui/x-charts/LineChart";
export const PlantLineChart = ({hours, value, unit} : {hours: number[], value: (number | null)[], unit: string}) => {
    var width = 800 ;
    return (
    <LineChart
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
              valueFormatter: (v) => (v) ? `${v}${unit}` : "N/A",
            },
          ]}
          width={width}
          height={200}
          grid={{ vertical: true, horizontal: true }}
        />);
}