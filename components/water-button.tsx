'use client';
import { Button } from "@/components/ui/button";
import { db, dbRef, plants, updatePlantWaterStatus } from "@/lib/plants";
import { Plant } from "@/schemas";
import { child, off, onValue, ref, } from "firebase/database";
import { useEffect, useState } from "react";
import { useTransition } from "react";

export const WaterButton = ({plant} : {plant : Plant}) => {
    const [isPending, startTransition] = useTransition();
    const [isWatered, setIsWatered] = useState(plant.is_watered);
    const handleWatering = async () => {
        function updateState(value: boolean) {
            setIsWatered(value);
            // Update database
            startTransition(async () => {
                await updatePlantWaterStatus(plant.id, value);
            });
        }
        var updatedState = true;
        updateState(updatedState);

        // Wait 3000ms to simulate watering
        await new Promise((resolve) => setTimeout(resolve, 3000));

        updatedState = false;
        updateState(updatedState);
    };
    
    useEffect(() => {
        const plantsRef = child(dbRef, `plants/${plant.id}/is_watered`);
        onValue(plantsRef, (snapshot) => {
            const data = snapshot.val() as boolean;
            setIsWatered(data);
        });
        return () => off(plantsRef);
    }, [isWatered]);

    return (
        <div className="w-full flex justify-center">
            <Button 
            disabled={isPending}
            variant={isWatered ? "secondary" : "default"} 
            onClick={handleWatering}
            className="">
                {isWatered ? "Watered" : "Make it wet"}
            </Button>
        </div>
    );
};
