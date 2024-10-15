import { PlantSchema } from "@/schemas";
import PlantCardWrapper from "./plant/plant-card-wrapper";

export const PlantGallery = ({plantList} : {plantList : PlantSchema[]}) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
            {plantList.map((plant) => <PlantCardWrapper key={plant.id} plantId={plant.id} />)}
        </div>
    );
};
