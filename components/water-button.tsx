'use client';
import { useState } from "react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { updatePlantWaterStatus } from "@/lib/plants";
import { PlantSchema } from "@/schemas";

export const WaterButton = ({plant} : {plant : PlantSchema}) => {
    const [isPending, startTransition] = useTransition();
    const [isWatered, setIsWatered] = useState(plant.water_button_state || false);


    const handleWatering = async () => {
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
        <div className="">
            <Button 
            disabled={isPending || plant.water_mode === 1}
            variant={plant.water_button_state ? "secondary" : "default"} 
            onClick={handleWatering}
            className="">
                {isWatered ? "Đang tưới..." : "Tưới cây nào!"}
            </Button>
        </div>
    );
};
