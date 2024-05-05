'use client';
import { PlantCard } from "./plant-card";
import { getPlants, plants } from "@/lib/plants";
import { Plant } from "@/schemas";

export const PlantGallery = async () => {
    const plantList: Plant[] = await getPlants().then((snapshot) => snapshot.val());

    return (
        <div className="grid grid-cols-3 gap-3 items-center">
            {plantList.map((plant) => <PlantCard key={plant.id} plant={plant} />)}
        </div>  
    );
};
