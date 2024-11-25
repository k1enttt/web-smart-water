'use client'
import { Switch } from "@/components/ui/switch";
import { putPlantUnit } from "@/lib/plant-unit";
import { PlantUnits } from "@/models/PlantUnit";
import { useEffect, useState } from "react";

export const AutomaticWateringSwitch = ({ plant }: { plant: PlantUnits }) => {
  const [isPending, setIsPending] = useState(false);
  const [waterMode, setWaterMode] = useState(plant.automatic_watering || false);

  const updateAutomaticMode = async () => {
    await putPlantUnit({
      ...plant,
      automatic_watering: !waterMode,
    } as PlantUnits).then(() => {
      setIsPending(false);
    });
  };

  const handleSwitch = () => {
    setIsPending(true);
    updateAutomaticMode();
    setWaterMode(!waterMode);
  };

  // TODO: Add a listener for changes in the automatic watering mode on MongoDB
  useEffect(() => {
  
  }, []);

  return (
    <div className="w-full flex items-center px-16 space-x-6">
      <div>Tưới cây tự động</div>
      <Switch
        checked={plant.automatic_watering}
        onCheckedChange={handleSwitch}
        disabled={isPending}
      />
    </div>
  );
};
