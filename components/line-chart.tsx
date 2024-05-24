import { LineChart } from "@mui/x-charts/LineChart";
export const PlantLineChart = ({hours, value, unit} : {hours: number[], value: (number | null)[], unit: string}) => {
    const width = innerWidth * 0.7;
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