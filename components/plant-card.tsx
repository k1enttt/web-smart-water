"use client";
import { useState } from "react";

import { PlantSchema } from "@/schemas";
import CardWrapper from "@/components/card-wrapper";
import PlantInfoCard from "./card-plant-info";
import PlantInstantInfo from "./plant/plant-instant-info";
import SensorCharts from "./plant/sensor-charts";

export const PlantCard = ({ plant }: { plant: PlantSchema }) => {
  const [plantData, setPlantData] = useState<PlantSchema>(plant);

  return (
    <div className="w-full flex gap-x-2 px-6">
      <CardWrapper plant={plantData} className="flex-1">
        <div>
          <PlantInstantInfo plant={plantData} />
        </div>
        <div>
          <SensorCharts plantId={plant.id} />  
        </div>
        
        
      </CardWrapper>
      <PlantInfoCard plant={plantData} className="flex-1 min-w-[300px] max-w-[400px] lg:inline hidden"/>
    </div>
  );
};
