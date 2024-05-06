'use client';
import { Plant } from "@/schemas";
import CardWrapper from "@/components/card-wrapper";
import { PercentageRow } from "@/components/percentage-row";

export const PlantCard = ({ plant }: { plant: Plant }) => {
    return (
        <CardWrapper plant={plant}>
            <div className="w-full flex items-center justify-center object-contain">
                <PercentageRow label="Humidity" percentage={plant.humidity} />
                <PercentageRow label="Moisture" percentage={plant.moisture} />
                <PercentageRow
                    label="Temperature"
                    percentage={plant.temperature}
                />
            </div>
        </CardWrapper>
    );
};
