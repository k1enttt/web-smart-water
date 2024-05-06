'use client';
import { Plant } from "@/schemas";
import CardWrapper from "@/components/card-wrapper";
import { PercentageRow } from "@/components/percentage-row";

export const PlantCard = ({ plant }: { plant: Plant }) => {
    return (
        <CardWrapper plant={plant}>
            <div className="w-full flex items-center justify-center object-contain, overflow-x-auto">
                <PercentageRow label="Humidity" value={plant.humidity} testPlantId={plant.id} />
                <PercentageRow label="Moisture" value={plant.moisture} testPlantId={plant.id} />
                <PercentageRow
                    label="Temperature"
                    value={plant.temperature}
                    testPlantId={plant.id}
                />
            </div>
        </CardWrapper>
    );
};
