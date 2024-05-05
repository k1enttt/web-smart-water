import { PlantCard } from "./plant-card";
import { getPlants, plants } from "@/lib/plants";
import { Plant } from "@/schemas";

export const PlantGallery = async () => {
    const plantList: Plant[] = await getPlants().then((snapshot) => snapshot.val());

    return (
        <div className="h-full w-full flex flex-col items-center gap-y-10">
            {plantList.map((plant) => <PlantCard key={plant.id} plant={plant} />)}
        </div>  
    );
};
