'use client';
import { Button } from "@/components/ui/button";
import { db, dbRef, listenOnChangeById, plants, updatePlantWaterStatus } from "@/lib/plants";
import { Plant } from "@/schemas";
import { child, off, onValue, ref, } from "firebase/database";
import { useEffect, useState } from "react";
import { useTransition } from "react";

export const WaterButton = ({plant} : {plant : Plant}) => {
    const [plantState, setPlantState] = useState<Plant>(plant);
    const [isPending, startTransition] = useTransition();
    const [isWatered, setIsWatered] = useState(plant.is_watered);
    const handleWatering = async () => {
        const updatedStatus = !isWatered;
        setIsWatered(updatedStatus);
        // Update database
        startTransition(async () => {
            await updatePlantWaterStatus(plant, updatedStatus);
        });
        // listen on change
    };
    
    useEffect(() => {
        const plantsRef = child(dbRef, `plants/${plant.id}`);
        onValue(plantsRef, (snapshot) => {
            const data = snapshot.val() as Plant;
            const plantIndex = plants.findIndex((plt) => plt.id === plant.id);
            plants[plantIndex] = data;
            setIsWatered(data.is_watered);
            console.log(plant);
        });
        return () => off(plantsRef);
    }, [plantState, isWatered]);

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
