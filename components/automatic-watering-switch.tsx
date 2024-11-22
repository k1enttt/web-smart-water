import { Switch } from "@/components/ui/switch";
import { putPlantUnit } from "@/lib/plant-unit";
import { PlantUnit } from "@/models/PlantUnit";
import { useState, useTransition } from "react";

export const AutomaticWateringSwitch = ({ plant }: { plant: PlantUnit }) => {
  const [isPending, startTransition] = useTransition();
  const [waterMode, setWaterMode] = useState(plant.automatic_watering || false);

  const handleSwitch = async () => {
    startTransition(async () => {
      // Update the automatic watering mode to Mongo Atlas
      await putPlantUnit({
        ...plant,
        automatic_watering: !waterMode,
      } as PlantUnit);
    });
  };

  // TODO: Add a listener for changes in the automatic watering mode on MongoDB

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
