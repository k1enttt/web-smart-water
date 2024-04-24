import { Plant } from "@/schemas";
import CardWrapper from "./card-wrapper";
import { PercentageRow } from "./percentage-row";

export const PlantCard = ({ plant }: { plant: Plant }) => {
    return (
        <CardWrapper title={plant.name}>
            <div className="w-full flex items-center justify-center flex-col">
                <PercentageRow label="Humidity" percentage={plant.humidity} />
                <PercentageRow label="Moisture" percentage={plant.moisture} />
                <PercentageRow label="Temperature" percentage={plant.temperature} />
            </div>
        </CardWrapper>
    );
};
