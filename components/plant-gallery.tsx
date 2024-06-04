'use client';
import { PlantCard } from "@/components/plant-card";
import { PlantSchema } from "@/schemas";

export const PlantGallery = ({plantList} : {plantList : PlantSchema[]}) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
            {plantList.map((plant) => <PlantCard key={plant.id} plant={plant} />)}
        </div>
    );
};
