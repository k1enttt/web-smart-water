"use client";
import BasicGauges from "@/components/gauge-chart";

type SensorType = "humidity" | "temperature" | "moisture" | "light";
interface SensorSchema {
  type: SensorType;
  value: number;
  unit: string;
  label: string;
  valueMax: number;
}
interface PercentageColProps {
  type: SensorType;
  value: number | undefined;
}

export const PercentageCol = ({ type, value }: PercentageColProps) => {
  let sensor: SensorSchema = {} as SensorSchema;
  switch (type) {
    case "humidity":
      sensor = {
        type: "humidity",
        value: value || NaN,
        label: "Độ ẩm không khí",
        unit: value ? "%" : " ",
        valueMax: 100,
      };
      break;
    case "temperature":
      sensor = {
        type: "temperature",
        value: value || NaN,
        label: "Nhiệt độ không khí",
        unit: value ? "°C" : "",
        valueMax: 50,
      };
      break;
    case "moisture":
      sensor = {
        type: "moisture",
        value: value || NaN,
        label: "Độ ẩm đất",
        unit: value ? "%": "",
        valueMax: 100,
      };
      break;
    case "light":
      sensor = {
        type: "light",
        value: value || NaN,
        label: "Ánh sáng",
        unit: value ? "lux" : "",
        valueMax: 1000,
      };
      break;
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <span>{sensor.label}</span>
        <span>
          <BasicGauges
            value={Math.round(sensor.value * 10) / 10}
            unit={sensor.unit}
            valueMax={sensor.valueMax}
          />
        </span>
      </div>
    </div>
  );
};
