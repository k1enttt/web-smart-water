"use client";
import { useState } from "react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { updatePlantWaterStatus } from "@/lib/plants";
import { PlantSchema } from "@/schemas";
import { useToast } from "@/components/ui/use-toast";
import { getFullDateString } from "@/lib/utils";

export const WaterButton = ({ plant }: { plant: PlantSchema }) => {
  const [isPending, startTransition] = useTransition();
  const [isWatered, setIsWatered] = useState(plant.water_button_state || false);
  const { toast } = useToast();

  const handleWatering = async () => {
    // Check if moisture level is too high
    if (plant.moisture && plant.high_threshold && plant.water_mode === 2) {
        const now = new Date();
        if (plant.moisture >= plant.high_threshold) {
            toast({
                title: "Độ ẩm đất quá cao! 💦",
                description: getFullDateString(now.toLocaleString()),
                variant: "destructive",
            });
            return;
        }
    }

    function updateState(value: boolean) {
      setIsWatered(value);
      // Update database
      startTransition(async () => {
        await updatePlantWaterStatus(plant.id, value);
      });
    }
    updateState(true);

    // Wait 3000ms to simulate watering
    await new Promise((resolve) => setTimeout(resolve, 3000));

    updateState(false);
  };
  return (
    <Button
      disabled={isPending || plant.water_mode === 1}
      variant={plant.water_button_state ? "secondary" : "default"}
      onClick={handleWatering}
      className=""
    >
      {isWatered ? "Đang tưới..." : "Tưới cây nào!"}
    </Button>
  );
};

