"use client";
import { dbRef } from "@/lib/db";
import { fillHourlogs, getTodayDaylogs } from "@/lib/utils";
import { LineChart } from "@mui/x-charts/LineChart";
import { child, off, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export const PlantLineChart = ({
  plantId,
  hours,
  type,
  className,
}: {
  plantId: string | undefined;
  hours: number[];
  type: "temperature" | "humidity" | "moisture" | "light";
  className?: string;
}) => {
  const [value, setValue] = useState<(number | null)[]>([]);

  useEffect(() => {
    const plantsRef = child(dbRef, `plants/${plantId}/daylogs`);
    onValue(plantsRef, (snapshot) => {
      const data = snapshot.val() as number;
      if (!data) {
        console.error("Plant data not found");
        return;
      }

      // Get today's daylogs
      if (!data) return;
      const daylogArray = Object.entries(data).map((daylog) => daylog[1]);
      const todayLog = getTodayDaylogs(daylogArray);
      const daylogs = todayLog || [];
      const todayLogsState = fillHourlogs(daylogs);

      if (todayLogsState.length > 0) {
        switch (type) {
          case "temperature":
            setValue(
              todayLogsState.map((state) => (state ? state.temperature : null))
            );
          case "humidity":
            setValue(
              todayLogsState.map((state) => (state ? state.humidity : null))
            );
          case "moisture":
            setValue(
              todayLogsState.map((state) => (state ? state.moisture : null))
            );
          case "light":
            setValue(
              todayLogsState.map((state) => (state ? state.light : null))
            );
        }
      }
    });
    return () => off(plantsRef);
  }, [value, plantId, type]);

  if (!plantId) {
    console.error("Plant ID not found");
    return null;
  }

  className = className || "";
  const unit =
    type === "temperature"
      ? "°C"
      : type === "humidity"
      ? "%"
      : type === "moisture"
      ? "%"
      : "LX";

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
          valueFormatter: (v) => (v ? `${v}${unit}` : "N/A"),
        },
      ]}
      height={200}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};
