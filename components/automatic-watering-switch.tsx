import { Switch } from "@/components/ui/switch";
import { updateAutomaticSwitchState } from "@/lib/plants";
import { PlantSchema } from "@/schemas";
import { useState, useTransition } from "react";

export const AutomaticWateringSwitch = ({plant} : {plant: PlantSchema}) => {
  const [isPending, startTransition] = useTransition();
  const [waterMode, setWaterMode] = useState(plant.water_mode || 2);


  const handleSwitch = async () => {
    let updatedMode = waterMode;
    if (waterMode === 1) {
      updatedMode = 2;
    } else {
      updatedMode = 1;
    }
    setWaterMode(updatedMode);
    // Update database
    startTransition(async () => {
      await updateAutomaticSwitchState(plant.id, updatedMode);
    });
  };

  return (
    <div className="w-full flex items-center px-16 space-x-6">
      <div>Tưới cây tự động</div>
      <Switch checked={plant.water_mode === 1} onCheckedChange={handleSwitch} disabled={isPending}/>
    </div>
  );
};
