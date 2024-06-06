"use client";
import { useEffect, useState } from "react";
import { child, off, onValue } from "firebase/database";

import { DayLogSchema, HourLogSchema, PlantSchema } from "@/schemas";
import CardWrapper from "@/components/card-wrapper";
import { PercentageCol } from "@/components/percentage-col";
import { dbRef } from "@/lib/plants";
import { hours } from "@/data/plant";
import { PlantLineChart } from "@/components/line-chart";
import { fillHourlogs, getTodayDaylogs } from "@/lib/utils";

type LineChartDataType = (number | null)[];

export const PlantCard = ({ plant }: { plant: PlantSchema }) => {
  const [plantData, setPlantData] = useState<PlantSchema>(plant);
  const [todayLogsState, setTodayLogsState] = useState<(HourLogSchema|null)[]>([]);
  const [temperatureState, setTemperatureState] = useState<LineChartDataType>([]);
  const [humidityState, setHumidityState] = useState<LineChartDataType>([]);
  const [moistureState, setMoistureState] = useState<LineChartDataType>([]);
  const [lightState, setLightState] = useState<LineChartDataType>([]);

  useEffect(() => {
    const plantsRef = child(dbRef, `plants/${plantData.id}`);
    onValue(plantsRef, (snapshot) => {
      const data = snapshot.val() as PlantSchema;
      setPlantData(data);

      // Get today's daylogs
      const todayLog = getTodayDaylogs(data.daylogs || []);
      const hourLogs = todayLog?.hourlogs || [];
      setTodayLogsState(fillHourlogs(hourLogs));

      if (todayLogsState.length > 0) {
        setTemperatureState(todayLogsState.map((d) => (d) ? d.temperature : null));
        setHumidityState(todayLogsState.map((d) => (d) ? d.humidity : null));
        setMoistureState(todayLogsState.map((d) => (d) ? d.moisture : null));
        setLightState(todayLogsState.map((d) => (d) ? d.light : null));
      }
    });
    return () => off(plantsRef);
  }, [plantData]);

  return (
<div className="w-full flex gap-x-2 px-6">
    <CardWrapper plant={plantData}>
        <div className="text-xl font-semibold text-center py-6">Trạng thái hiện tại</div>
      <div className="w-full flex items-center justify-around object-contain overflow-x-auto pb-4">
        <PercentageCol type="humidity" plant={plantData} />
        <PercentageCol type="moisture" plant={plantData} />
        <PercentageCol type="temperature" plant={plantData} />
        <PercentageCol type="light" plant={plantData} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-lg font-semibold py-6">Biểu đồ theo giờ</div>
        <div>
          <div>Nhiệt độ không khí</div>
          <PlantLineChart hours={hours} value={temperatureState} unit="°C" />
        </div>
        <div>
          <div>Độ ẩm không khí</div>
          <PlantLineChart hours={hours} value={humidityState} unit="%" />
        </div>
        <div>
          <div>Độ ẩm đất</div>
          <PlantLineChart hours={hours} value={moistureState} unit="%" />
        </div>
        <div>
          <div>Cường độ ánh sáng</div>
          <PlantLineChart hours={hours} value={lightState} unit="LX" />
        </div>
      </div>
    </CardWrapper>
      <Card className="flex-1 p-4">
        <CardHeader>
          <CardTitle>{plantData.name}</CardTitle>
          <CardDescription>
            {plant.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
        
        </CardContent>
      </Card>
    </div>
  );
};
