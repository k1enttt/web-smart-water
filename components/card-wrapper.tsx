import React, { useEffect, useState } from "react";
import { child, off, onValue } from "firebase/database";

import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { AutomaticWateringSwitch } from "@/components/automatic-watering-switch";
import { WaterButton } from "@/components/water-button";
import { Plant } from "@/schemas";
import { dbRef } from "@/lib/plants";

interface CardWrapperProps {
    children: React.ReactNode;
    plant: Plant;
}

const CardWrapper = ({ children, plant }: CardWrapperProps) => {
    const defaultName = "New plant";

    return (
        <Card className="w-[90%] min-w-[400px] shadow-md">
            <CardHeader>
                <Header label={plant.name || defaultName} />
                {plant.description && 
                <div className="text-gray-400 font-normal text-center">
                    {plant.description}
                </div>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <AutomaticWateringSwitch plant={plant} />
            </CardFooter>
            <CardFooter>
                <WaterButton plant={plant}/>
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;
