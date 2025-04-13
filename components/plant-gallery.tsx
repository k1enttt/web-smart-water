'use client';
import { PlantCard } from "@/components/plant-card";
import { PlantUnits } from "@/models/PlantUnit";

export const PlantGallery = ({plantList} : {plantList : PlantUnits[]}) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
            {plantList.map((plant) => <PlantCard key={plant.plant_name} plant={plant} />)}
        </div>
    );
};
