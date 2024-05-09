'use client';
import { useEffect, useState } from "react";
import { child, off, onValue } from "firebase/database";

import { Plant } from "@/schemas";
import CardWrapper from "@/components/card-wrapper";
import { PercentageRow } from "@/components/percentage-row";
import { dbRef, getPlantById } from "@/lib/plants";

export const PlantCard = ({ plant }: { plant: Plant }) => {
    const [plantData, setPlantData] = useState<Plant>(plant);
    useEffect(() => {
        const plantsRef = child(dbRef, `plants/${plant.id}`);
        onValue(plantsRef, (snapshot) => {
            const data = snapshot.val() as Plant;
            setPlantData(data);
        });
        return () => off(plantsRef);
    }, [plantData])

    return (
        <CardWrapper plant={plantData}>
            <div className="w-full flex items-center justify-center object-contain overflow-x-auto">
                <PercentageRow label="Humidity" plant={plantData} />
                <PercentageRow label="Moisture" plant={plantData} />
                <PercentageRow
                    label="Temperature"
                    plant={plantData}
                />
            </div>
        </CardWrapper>
    );
};
