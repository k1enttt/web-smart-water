"use client";
import { useEffect, useState } from "react";
import { child, off, onValue } from "firebase/database";

import { Plant } from "@/schemas";
import CardWrapper from "@/components/card-wrapper";
import { PercentageCol } from "@/components/percentage-col";
import { dbRef } from "@/lib/plants";
import { hours, randomDaylogs } from "@/data/plant";
import { PlantLineChart } from "./line-chart";
import { fillDaylogs, getTodayDaylogs } from "@/lib/utils";

export const PlantCard = ({ plant }: { plant: Plant }) => {
  const [plantData, setPlantData] = useState<Plant>(plant);
  useEffect(() => {
    const plantsRef = child(dbRef, `plants/${plantData.id}`);
    onValue(plantsRef, (snapshot) => {
      const data = snapshot.val() as Plant;
      setPlantData(data);
    });
    return () => off(plantsRef);
  }, [plantData]);

  // Line chart data  
  // const data = randomDaylogs;
  const todayDaylogs = fillDaylogs(getTodayDaylogs(plantData.daylogs || []));
  const temperature = todayDaylogs.map((d) => (d) ? d.temperature : null);
  const humidity = todayDaylogs.map((d) => (d) ? d.humidity : null);
  const moisture = todayDaylogs.map((d) => (d) ? d.moisture : null);

  return (
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
          <PlantLineChart hours={hours} value={temperature} unit="°C" />
        </div>
        <div>
          <div>Độ ẩm không khí</div>
          <PlantLineChart hours={hours} value={humidity} unit="%" />
        </div>
        <div>
          <div>Độ ẩm đất</div>
          <PlantLineChart hours={hours} value={moisture} unit="%" />
        </div>
      </div>
    </CardWrapper>
  );
};
