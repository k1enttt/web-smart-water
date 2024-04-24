import { plants } from "@/data/plant";
import { PlantCard } from "./plant-card";
import { Plant } from "@/schemas";
import { getPlants } from "@/lib/plants";

export const PlantGallery = async () => {
    const plantList: Plant[] = await getPlants().then((snapshot) => snapshot.val());

    return (
        <div className="grid grid-cols-3 gap-3 items-center">
            {plantList.map((plant) => <PlantCard plant={plant} />)}
        </div>  
    );
};
