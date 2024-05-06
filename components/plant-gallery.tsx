'use client';
import { PlantCard } from "./plant-card";
import { Plant } from "@/schemas";

import { useState, useEffect, useTransition } from "react";

export const PlantGallery = ({plantList} : {plantList : Plant[]}) => {
    const [plants, setPlants] = useState(plantList);

    useEffect(() => {
        setPlants(plantList);
    }, [plantList]);
    

    return (
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
            {plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)}
        </div>
    );
};
