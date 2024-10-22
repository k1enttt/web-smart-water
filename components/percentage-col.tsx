"use client";
import BasicGauges from "@/components/gauge-chart";
import { getPlantsRef } from "@/lib/db";
import { PlantSchema } from "@/schemas";
import { child, DatabaseReference, off, onValue } from "firebase/database";
import { useEffect, useState } from "react";

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
  plant: PlantSchema;
}

const matchTypeProps = {
  "temperature": {
    label: "Nhiệt độ không khí",
    unit: "°C",
    valueMax: 50,
  },
  "humidity" : {
    label: "Độ ẩm không khí",
    unit: "%",
    valueMax: 100,
  },
  "moisture" : {
    label: "Độ ẩm đất",
    unit: "%",
    valueMax: 100,
  },
  "light": {
    label: "Ánh sáng",
    unit: "lux",
    valueMax: 1000,
  },
}

export const PercentageCol = ({ type, plant }: PercentageColProps) => {
  const [sensor, setSensor] = useState({
    type,
    value: plant[type],
    label: matchTypeProps[type].label,
    unit: matchTypeProps[type].unit,
    valueMax: matchTypeProps[type].valueMax,
  } as SensorSchema);
  const plantsRef: DatabaseReference = getPlantsRef();
  const sensorRef = child(plantsRef, `${plant.id}/${type}`);

  useEffect(() => {
    onValue(
      sensorRef,
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          console.error("Plant data not found");
          return;
        }
        setSensor({
          type,
          label: matchTypeProps[type].label,
          valueMax: matchTypeProps[type].valueMax,
          value: data ? Number(data) : plant[type] || NaN,
          unit: data ? matchTypeProps[type].unit : "",
        });
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
    return () => off(sensorRef);
  }, [sensor, plant, type, plantsRef]);

  if (!plant.id) {
    console.error("Plant ID not found");
    return null;
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
