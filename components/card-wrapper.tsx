import React from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { AutomaticWateringSwitch } from "./automatic-watering-switch";
import { WaterButton } from "./water-button";
import { Plant } from "@/schemas";

interface CardWrapperProps {
    children: React.ReactNode;
    plant: Plant;
}

const CardWrapper = ({ children, plant }: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={plant.name} />
                {plant.short_description && 
                <div className="text-gray-400 font-normal text-center">
                    {plant.short_description}
                </div>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <AutomaticWateringSwitch />
            </CardFooter>
            <CardFooter>
                <WaterButton plant={plant}/>
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;
